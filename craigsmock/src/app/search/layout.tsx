'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import Image from "next/image";
import SidebarComponent from "./sidebarComponent/sidebar";
import { useSearchParams } from "next/navigation";

export default function SearchLayout({children, }: { children: React.ReactNode })  {
    const searchParams = useSearchParams();
    const cat = searchParams.get('cat');

    if (cat == null) {}
 
    return (
        <html lang="en">
            <body>
                <Navbar className="" maxWidth="sm">
                    <NavbarBrand>
                    <Image src="/testemblem.png" height={50} width={50} alt="" /> <a href="/">Ray's List</a>
                    </NavbarBrand>
                    <NavbarContent justify="center">
                        <NavbarItem>
                            <p>Philadelphia &gt; {cat} &gt; (SubCategory)</p>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
                <div className="flex">
                <SidebarComponent/>
                <main>
                    {children}
                </main>  
                </div>

            </body>
        </html>
    )
}