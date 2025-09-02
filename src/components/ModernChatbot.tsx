'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isAdmin?: boolean;
}

export default function ModernChatbot({ isAdmin = false }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to Moonlit Hotel. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: [
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'
    ],
    booking: [
      'book', 'booking', 'reservation', 'room', 'availability', 'check in', 'check out'
    ],
    services: [
      'service', 'amenities', 'facilities', 'spa', 'restaurant', 'gym', 'pool'
    ],
    pricing: [
      'price', 'cost', 'rate', 'fee', 'payment', 'discount', 'offer'
    ],
    location: [
      'location', 'address', 'directions', 'nearby', 'airport', 'transport'
    ]
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (predefinedResponses.greeting.some(keyword => message.includes(keyword))) {
      return "Hello! 😊 I'm here to help you with your hotel needs. You can ask me about room bookings, our services, pricing, or anything else!";
    }
    
    if (predefinedResponses.booking.some(keyword => message.includes(keyword))) {
      return "🏨 I'd be happy to help with your booking! Our luxury rooms start from $299/night. Would you like me to check availability for specific dates? You can also visit our Rooms page for detailed information.";
    }
    
    if (predefinedResponses.services.some(keyword => message.includes(keyword))) {
      return "✨ Moonlit Hotel offers premium amenities including:\n• Luxury Spa & Wellness Center\n• Fine Dining Restaurant\n• Rooftop Infinity Pool\n• 24/7 Fitness Center\n• Concierge Services\n• Free WiFi & Parking";
    }
    
    if (predefinedResponses.pricing.some(keyword => message.includes(keyword))) {
      return "💰 Our room rates vary by season and availability:\n• Standard Room: $299-399/night\n• Deluxe Suite: $599-799/night\n• Presidential Suite: $1299-1599/night\n\nWe often have special offers - check our website for current deals!";
    }
    
    if (predefinedResponses.location.some(keyword => message.includes(keyword))) {
      return "📍 Moonlit Hotel is located in the heart of the city:\n• 15 minutes from downtown\n• 25 minutes from airport\n• Walking distance to shopping districts\n• Easy access to public transport\n\nWould you like detailed directions?";
    }
    
    return "🤔 I'm here to help! You can ask me about:\n• Room bookings and availability\n• Hotel services and amenities\n• Pricing and special offers\n• Location and directions\n• Any other hotel-related questions!";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #F1C40F)',
            border: 'none',
            borderRadius: '50%',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)',
            transition: 'all 0.3s ease',
            animation: 'pulse 2s infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(212, 175, 55, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.4)';
          }}
        >
          <MessageCircle size={28} color="white" />
        </button>
        <style jsx>{`
          @keyframes pulse {
            0% { box-shadow: 0 8px 32px rgba(212, 175, 55, 0.4); }
            50% { box-shadow: 0 8px 32px rgba(212, 175, 55, 0.8); }
            100% { box-shadow: 0 8px 32px rgba(212, 175, 55, 0.4); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: isMinimized ? '24px' : '24px', 
      right: '24px', 
      zIndex: 1000,
      width: isMinimized ? '320px' : '400px',
      height: isMinimized ? '60px' : '600px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #D4AF37, #F1C40F)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={20} />
            </div>
            <div>
              <div style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                fontWeight: '700',
                fontFamily: "'Gilda Display', serif"
              }}>
                Hotel Assistant
              </div>
              <div style={{ 
                fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                opacity: 0.9,
                fontFamily: "'Jost', sans-serif"
              }}>
                Always here to help
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '6px',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Minimize2 size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '6px',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    maxWidth: '80%',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                  }}>
                    <div style={{
                      background: message.sender === 'user' ? '#D4AF37' : 'white',
                      borderRadius: '50%',
                      padding: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}>
                      {message.sender === 'user' ? (
                        <User size={16} color="white" />
                      ) : (
                        <Bot size={16} color="#D4AF37" />
                      )}
                    </div>
                    <div style={{
                      background: message.sender === 'user' 
                        ? 'linear-gradient(135deg, #D4AF37, #F1C40F)' 
                        : 'white',
                      color: message.sender === 'user' ? 'white' : '#1F2937',
                      padding: '12px 16px',
                      borderRadius: message.sender === 'user' 
                        ? '20px 20px 4px 20px' 
                        : '20px 20px 20px 4px',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                      lineHeight: '1.5',
                      fontFamily: "'Jost', sans-serif",
                      whiteSpace: 'pre-line'
                    }}>
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      background: 'white',
                      borderRadius: '50%',
                      padding: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}>
                      <Bot size={16} color="#D4AF37" />
                    </div>
                    <div style={{
                      background: 'white',
                      padding: '12px 16px',
                      borderRadius: '20px 20px 20px 4px',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      gap: '4px'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#D4AF37',
                        animation: 'typing 1.4s infinite ease-in-out'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#D4AF37',
                        animation: 'typing 1.4s infinite ease-in-out 0.2s'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#D4AF37',
                        animation: 'typing 1.4s infinite ease-in-out 0.4s'
                      }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '20px',
              background: 'white',
              borderTop: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-end'
              }}>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  style={{
                    flex: 1,
                    border: '2px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                    fontFamily: "'Jost', sans-serif",
                    resize: 'none',
                    outline: 'none',
                    maxHeight: '80px',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  style={{
                    background: inputText.trim() 
                      ? 'linear-gradient(135deg, #D4AF37, #F1C40F)' 
                      : '#E5E7EB',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Send size={16} color={inputText.trim() ? 'white' : '#9CA3AF'} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
