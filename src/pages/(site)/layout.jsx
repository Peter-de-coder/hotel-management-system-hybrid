import React, {ReactNode} from 'react';
import Footer from "@/components/footer";
import Nav from "@/components/header/nav";

export default function SiteLayout({children}: { children: ReactNode }) {
    return (
        <>
            <Nav/>
            {children}
            <Footer/>

        </>
    )
}