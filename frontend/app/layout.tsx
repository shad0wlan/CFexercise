import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/providers/Toaster";
import BottomBar from "@/components/ui/BottomBar";

const openSans = Open_Sans({ weight: ["400", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Plastiki",
    description: "Σύστημα διαχείρισης Plastiki",
    icons: {
        icon: "/favicon.png",
        apple: "/favicon.png",
    },
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Plastiki"
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    themeColor: "#000000",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${openSans.className} bg-main bg-cover bg-center bg-no-repeat min-h-dvh flex flex-col`}
        >
        {children}
        <Toaster />
        <BottomBar />
        </body>
        </html>
    );
}