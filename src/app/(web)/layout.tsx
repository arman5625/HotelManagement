import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import ThemeProivider from "@/src/components/ThemeProvider/ThemeProvider";
import { NextAuthProvider } from "@/src/components/AuthProvider/AuthProvider";
import Toast from "@/src/components/Toast/Toast";

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

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700', '900'], style: ['italic', 'normal'], variable: "--font-poppins" })

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
      <head>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" 
        integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer" 
        />
      </head>
      <body
        className={poppins.className}
      >
        <NextAuthProvider>
          <ThemeProivider>
            <Toast />
            <main className="font-normal">
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProivider>
        </NextAuthProvider>



      </body>
    </html>
  );
}
