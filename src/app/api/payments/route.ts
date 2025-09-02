import { NextRequest, NextResponse } from 'next/server';
import { PaymentService } from '../../utils/businessLogic';
import emailService from '../../utils/emailService';

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json();

    switch (action) {
      case 'process':
        return await processPayment(data);
      case 'verify':
        return await verifyPayment(data);
      case 'refund':
        return await processRefund(data);
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function processPayment(paymentData: any) {
  try {
    const {
      bookingId,
      amount,
      currency = 'INR',
      paymentMethod,
      customerData,
      billingAddress
    } = paymentData;

    // Validate required fields
    if (!amount || !paymentMethod || !customerData) {
      return NextResponse.json(
        { success: false, error: 'Missing required payment data' },
        { status: 400 }
      );
    }

    // Process payment using PaymentService
    const paymentResult = await PaymentService.processPayment({
      bookingId,
      amount,
      currency,
      paymentMethod,
      customerData,
      billingAddress
    });

    if (paymentResult.success) {
      // Send payment confirmation email
      try {
        await emailService.sendPaymentConfirmation({
          bookingId,
          email: customerData.email,
          amount,
          paymentMethod,
          transactionId: paymentResult.transactionId
        });
      } catch (emailError) {
        console.log('Payment confirmation email failed:', emailError);
      }

      return NextResponse.json({
        success: true,
        transaction: paymentResult.payment,
        message: 'Payment processed successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: paymentResult.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

async function verifyPayment(verificationData: any) {
  try {
    const { transactionId, paymentId } = verificationData;

    if (!transactionId) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID required' },
        { status: 400 }
      );
    }

    const verificationResult = await PaymentService.getPaymentByTransactionId(transactionId);

    return NextResponse.json({
      success: verificationResult.success,
      status: verificationResult.success ? 'verified' : 'failed',
      transaction: verificationResult.payment
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}

async function processRefund(refundData: any) {
  try {
    const { transactionId, amount, reason } = refundData;

    if (!transactionId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID and amount required for refund' },
        { status: 400 }
      );
    }

    const refundResult = await PaymentService.refundPayment(transactionId, amount);

    return NextResponse.json({
      success: refundResult.success,
      refund: refundResult.refund,
      message: refundResult.success ? 'Refund processed successfully' : refundResult.error
    });
  } catch (error) {
    console.error('Refund processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Refund processing failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');
    const bookingId = searchParams.get('bookingId');

    if (transactionId) {
      // Get payment status by transaction ID
      const paymentStatus = await PaymentService.getPaymentByTransactionId(transactionId);
      return NextResponse.json({
        success: true,
        payment: paymentStatus.payment
      });
    } else if (bookingId) {
      // Get payments for a booking (mock implementation)
      return NextResponse.json({
        success: true,
        payments: [] // Mock empty payments for now
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Transaction ID or Booking ID required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment retrieval error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve payment information' },
      { status: 500 }
    );
  }
}
