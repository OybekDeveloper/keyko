import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Toaster as ToasterSunner } from "sonner";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import NextTopLoader from "nextjs-toploader";
import 'stream-chat-react/dist/css/v2/index.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Keykomania",
  description:
    "O’zbekistondagi top foodmobilogrof Ziyoda Inomkxo’jayeva web-saytiga xush kelibsiz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader
          color="hsla(149, 54%, 87%)"
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
                      <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={999999999}
          showAtBottom={false}
        />
        <Header />
        {children}
        <Footer />
        <Toaster position="top-center" />
        <ToasterSunner position="top-center" />
      </body>
    </html>
  );
}
