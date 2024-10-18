import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import ModalContextProvider from "@/contexts/Modal.context";
import Modal from "@/components/molecules/Modal.component";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Heart Bridge",
  description:
    "A crowd funding platform for orhanages to receive donations to projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          // {...{ crossOrigin: true }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          {...{ crossorigin: "anonymous", referrerpolicy: "no-referrer" }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} !font-poppins antialiased w-screen h-screen overflow-x-hidden overflow-y-auto text-primary-grey`}
      >
        <ModalContextProvider>
          {children}
          <Modal />
        </ModalContextProvider>
        <NextTopLoader color="#007AFF" />
      </body>
    </html>
  );
}
