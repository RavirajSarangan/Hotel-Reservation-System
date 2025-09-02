import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './components/auth/AuthProvider';
import "../../assets/css/plugins/bootstrap.min.css";
import "../../assets/css/plugins/cookit.min.css";
import "../../assets/css/plugins/gdpr-cookie.css";
import "../../assets/css/plugins/jaralux.min.css";
import "../../assets/css/plugins/jquery-ui.min.css";
import "../../assets/css/plugins/magnific-popup.css";
import "../../assets/css/plugins/meanmenu.css";
import "../../assets/css/plugins/nice-select.css";
import "../../assets/css/plugins.min.css";
import "../../assets/fonts/flaticon_bokinn.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import "../../assets/css/style.css";
import "react-datepicker/dist/react-datepicker.css";
import 'aos/dist/aos.css';
import "./globals.css";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Moonlit Hotel - Complete Hotel Management System",
  description: "Modern Hotel Reservation and Management System with AI-powered features",
  icons: {
    icon: "/assets/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: '14px',
                  fontWeight: '500',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            {children}
            <Script
              src="/assets/js/smoothscroll.js"
              strategy="afterInteractive"
            />
          </body>
        </html>
      </AuthProvider>
    </ClerkProvider>
  );
}
