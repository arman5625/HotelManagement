import type { Metadata } from "next";
import {Poppins} from "next/font/google";

import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ThemeProivider from "../components/ThemeProvider/ThemeProvider";

// const geistSans = Poppins({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = Poppins({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = Poppins({subsets: ['latin'], weight: ['400', '500', '700', '900' ], style: ['italic', 'normal'], variable: "--font-poppins"})

export const metadata: Metadata = {
  title: "Hotel Management App",
  description: "Discover the best hotel rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
      <ThemeProivider>
      <main className="font-normal">
        <Header />
        {children}
        <Footer />
      </main>
      </ThemeProivider>
   

      </body>
    </html>
  );
}
