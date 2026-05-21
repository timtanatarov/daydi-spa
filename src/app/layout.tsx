import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Курс по заказам на Таобао и 1688",
  description: "Пошаговое обучение выгодному шопингу с китайских маркетплейсов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} min-w-0 overflow-x-clip antialiased`}>
        <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip">
          <div className="min-[481px]:hidden">
            <Header />
          </div>
          {children}
          <div className="min-[481px]:hidden">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
