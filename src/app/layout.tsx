import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// Update the import path if necessary, for example:
import Navbar from '../components/ui/Navbar';
// Or, if the file exists elsewhere, adjust the path accordingly.
// If the file does not exist, create it at src/components/ui/Navbar.tsx or Navbar/index.tsx.
// Update the import path if necessary, for example:
import Footer from '../components/ui/Footer';
// Or, if the file exists elsewhere, adjust the path accordingly.
// If the file does not exist, create it at src/components/ui/Footer.tsx or Footer/index.tsx.

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Walbas - Online Auction Platform',
  description: 'Bid and buy unique items',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}