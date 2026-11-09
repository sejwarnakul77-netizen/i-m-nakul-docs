import type { Metadata } from "next"; import "./globals.css";
export const metadata:Metadata={title:{default:"Nakul Docs",template:"%s · Nakul Docs"},description:"Public guides and documentation."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}