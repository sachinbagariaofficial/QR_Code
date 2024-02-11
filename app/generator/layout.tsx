import type { Metadata } from "next";

export const metadata:Metadata ={
    title:"QR Generator",
    description:"This is for QR Generator"
};

export default function GeneratorLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (<> 
    {children}
    </>

    )
}