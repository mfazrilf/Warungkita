import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WarungKita',
  description: 'Warung kelontong online dan dashboard admin sederhana.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
