import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satisfill",
  description: "Diet and nutrition platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
