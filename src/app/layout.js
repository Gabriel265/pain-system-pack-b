import "./globals.css";

export const metadata = {
  title: "The Pain System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
