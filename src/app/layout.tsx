import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Habitly — Small steps, real change",description:"Build consistency one day at a time with Habitly."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
