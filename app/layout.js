import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Bant.ai",
  description: "AI-powered online safety for children",
};

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
