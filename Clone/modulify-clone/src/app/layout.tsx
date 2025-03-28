import type { Metadata } from 'next';
import "./globals.css";
import { NavBar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Estate Eminence Ventures – Premium Indian Real Estate Platform | Powered by AI',
  description: 'Estate Eminence Ventures is India\'s premier AI-powered real estate platform. Discover premium properties across India with advanced analytics, market insights, and seamless transactions for homeowners, investors, and growing portfolios.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
