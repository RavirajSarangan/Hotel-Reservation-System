import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/index';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();
  const body = JSON.parse(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  // Connect to database
  await connectToDatabase();

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    
    try {
      // Create new user in database
      const newUser = new User({
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name || '',
        lastName: last_name || '',
        profileImage: image_url || '',
        role: 'customer', // Default role
        isActive: true,
      });

      await newUser.save();
      console.log('User created in database:', newUser);
    } catch (error) {
      console.error('Error creating user in database:', error);
      return new Response('Error creating user', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    
    try {
      // Update user in database
      const updatedUser = await User.findOneAndUpdate(
        { clerkId: id },
        {
          email: email_addresses[0].email_address,
          firstName: first_name || '',
          lastName: last_name || '',
          profileImage: image_url || '',
        },
        { new: true }
      );

      console.log('User updated in database:', updatedUser);
    } catch (error) {
      console.error('Error updating user in database:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    
    try {
      // Soft delete user in database (set isActive to false)
      const deletedUser = await User.findOneAndUpdate(
        { clerkId: id },
        { isActive: false },
        { new: true }
      );

      console.log('User deactivated in database:', deletedUser);
    } catch (error) {
      console.error('Error deactivating user in database:', error);
      return new Response('Error deactivating user', { status: 500 });
    }
  }

  return new Response('', { status: 200 });
}
