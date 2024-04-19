import SubPageLayout from "@/layouts/subPageLayout";
import { GetServerSideProps } from "next";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {

    return {
        props : {

        }
    }
}

export default function Page({}) {
    const [cat, setCat] = useState("cat");

    return (
        <SubPageLayout className="place-content-center"cat={undefined} subCat={undefined}>
            <CreationMainMenu setCat={setCat}/> 
        </SubPageLayout>

    );
}

export function CreationMainMenu({setCat}){ // WHat type of posting is this (categories)
    return(
        <div className="">
            <h3><b>What Category will this go to?</b></h3>
        </div>
    )
}

export function CreationSubMenu({setCat}){ //please choose a category (subcategory)

}

export function CreateCommunityPost(){ 

}

export function CommonFields(){ // post title, location, post description, contact info

}