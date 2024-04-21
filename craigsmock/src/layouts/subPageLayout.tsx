import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import Image from "next/image";
import SidebarComponent from "../app/search/sidebarComponent/sidebar";
import {useRouter} from "next/router";
import { useEffect } from 'react';
import '../app/globals.css'

export default function SubPageLayout({children, cat, subCat, className, createPost}: { children: React.ReactNode; cat: any; subCat: any; className: any; createPost: boolean;})  {



    className = className + " flex w-full h-full";
    return (
            <main className="w-full h-full">
                <Navbar position="static" className="" maxWidth="sm">
                    <NavbarBrand>
                    <Image src="/testemblem.png" height={50} width={50} alt="" /> <a href="/">Ray's List</a>
                    </NavbarBrand>
                    <NavbarContent justify="center">
                        <NavbarItem>
                            {createPost == true ? <p> Create a Post!</p> :<p>Philadelphia &gt; {cat} &gt; {subCat}</p>}
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
                <div className={className}>
                    {children}
                </div>  
            </main>
    )
}