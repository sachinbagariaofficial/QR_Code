import type { Metadata } from "next";

export const metadata:Metadata ={
    title:"QR Scanner",
    description:"This is for QR Scanner"
};

export default function ScannerLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (<> 
    {children}
    </>

    )
}