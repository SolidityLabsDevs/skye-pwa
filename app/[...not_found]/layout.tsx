export const metadata = {
  title: 'Not Found',
  description: '404 | Not Found',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
