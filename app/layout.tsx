import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - Arce Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://nextjs-dashboard-one-omega-91.vercel.app'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
