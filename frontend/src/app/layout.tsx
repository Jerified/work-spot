import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { Toaster } from 'sonner';
import { Providers } from './providers';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'WorkSpot - Find Your Perfect Workspace',
  description: 'Discover and book amazing co-working spaces that match your needs and inspire productivity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-roboto bg-[#191B2B] text-white">
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
} 