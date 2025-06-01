import type { Metadata } from "next";
import { poppins } from "./fonts";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Data Visualization Dashboard",
  description: "Interactive data visualization dashboard for insights analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex lg:pl-0 transition-colors duration-200">
              {children}
              
              {/* Overlay for mobile sidebar */}
              <div id="sidebar-overlay" className="fixed inset-0 bg-black opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden z-30"></div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
