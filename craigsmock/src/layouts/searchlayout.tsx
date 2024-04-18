import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import Image from "next/image";
import SidebarComponent from "../app/search/sidebarComponent/sidebar";
import {useRouter} from "next/router";
import { useEffect } from 'react';
import '../app/globals.css'

export default function SearchLayout({children, cat, subCat}: { children: React.ReactNode; cat: any; subCat: any;})  {

    
    return (
            <main className="w-full h-full">
                <Navbar className="" maxWidth="sm">
                    <NavbarBrand>
                    <Image src="/testemblem.png" height={50} width={50} alt="" /> <a href="/">Ray's List</a>
                    </NavbarBrand>
                    <NavbarContent justify="center">
                        <NavbarItem>
                            <p>Philadelphia &gt; {cat} &gt; {subCat} From the layout!</p>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
                <div>
                    {children}
                </div>  
            </main>
    )
}