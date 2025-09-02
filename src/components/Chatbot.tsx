'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  onChatToggle?: (isOpen: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onChatToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Moonlit Hotel. How can I help you today?',
      isBot: true,
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

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onChatToggle?.(newState);
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Hotel booking related responses
    if (message.includes('book') || message.includes('reservation') || message.includes('room')) {
      return "I'd be happy to help you with a room reservation! You can check our available rooms and make a booking through our website. Would you like me to show you our room types and current rates?";
    }
    
    if (message.includes('price') || message.includes('rate') || message.includes('cost')) {
      return "Our room rates vary by season and room type. Standard rooms start from $150/night, Deluxe rooms from $200/night, and Suites from $350/night. All rates include complimentary Wi-Fi and breakfast. Would you like more details about a specific room type?";
    }
    
    if (message.includes('amenities') || message.includes('facilities')) {
      return "Moonlit Hotel offers: 🏊 Swimming Pool, 🏋️ Fitness Center, 🍽️ Restaurant & Bar, 🅿️ Free Parking, 📶 Free Wi-Fi, 🛎️ 24/7 Room Service, 🧖‍♀️ Spa Services, and 🏢 Business Center. Which amenity would you like to know more about?";
    }
    
    if (message.includes('location') || message.includes('address')) {
      return "We're conveniently located in the heart of the city with easy access to major attractions, shopping centers, and business districts. Our concierge team can help arrange transportation and recommend local attractions.";
    }
    
    if (message.includes('cancel') || message.includes('modify')) {
      return "You can modify or cancel your reservation online through our booking portal or by calling our reservations team. Cancellations made 24 hours before check-in are free of charge.";
    }
    
    if (message.includes('check in') || message.includes('check out')) {
      return "Check-in is from 3:00 PM and check-out is until 11:00 AM. Early check-in and late check-out can be arranged subject to availability. Our front desk is available 24/7 to assist you.";
    }
    
    if (message.includes('restaurant') || message.includes('dining') || message.includes('food')) {
      return "Our award-winning restaurant 'Moonlight Bistro' serves contemporary cuisine with locally sourced ingredients. We also offer 24/7 room service, a rooftop bar, and can accommodate special dietary requirements.";
    }
    
    if (message.includes('parking')) {
      return "We offer complimentary self-parking for all guests. Valet parking is also available for $25/day. Electric vehicle charging stations are available in our parking garage.";
    }
    
    if (message.includes('wifi') || message.includes('internet')) {
      return "High-speed Wi-Fi is complimentary throughout the hotel including all guest rooms, lobby, restaurant, and business center. We also offer a premium internet package for enhanced bandwidth.";
    }
    
    if (message.includes('pet') || message.includes('dog') || message.includes('cat')) {
      return "We're a pet-friendly hotel! We welcome pets up to 50 lbs with a $75 pet fee per stay. We provide pet beds, bowls, and treats. Please let us know when booking that you'll be bringing a furry friend.";
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return "You can reach us at: 📞 Phone: (555) 123-4567, 📧 Email: info@moonlithotel.com, or visit our front desk. Our team is available 24/7 to assist you with any questions or requests.";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! It's my pleasure to help. If you have any other questions about Moonlit Hotel or would like to make a reservation, feel free to ask. Have a wonderful day! 🌟";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to Moonlit Hotel. I'm here to help you with any questions about our rooms, amenities, services, or reservations. What would you like to know?";
    }
    
    // Default response
    return "I'd be happy to help you with information about our hotel, rooms, amenities, reservations, or any other questions you might have. Could you please provide more details about what you're looking for?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    'Room availability',
    'Pricing information',
    'Hotel amenities',
    'Make a reservation',
    'Contact information'
  ];

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    handleSendMessage();
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="chatbot-window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-hotel-primary to-hotel-darkGold text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Moonlit Assistant</h3>
                    <p className="text-xs opacity-90">Online - Ready to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="text-white hover:bg-white hover:bg-opacity-20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 max-h-80 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot ? 'bg-hotel-primary text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {message.isBot ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.isBot 
                        ? 'bg-white text-gray-800 shadow-sm' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-hotel-primary text-white rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3" />
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="p-3 bg-gray-50 border-t">
                <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-hotel-primary hover:text-white transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white rounded-b-xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hotel-primary focus:border-transparent"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  size="icon"
                  className="bg-hotel-primary hover:bg-hotel-darkGold"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="chatbot-toggle shadow-xl"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
  );
};

export default Chatbot;
