import { Poppins } from "next/font/google";

// Define Poppins font with various weights and styles
export const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-poppins",
  fallback: ['system-ui', 'sans-serif'],
});
