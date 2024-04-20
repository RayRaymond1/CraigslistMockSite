import SubPageLayout from "@/layouts/subPageLayout";
import { RadioGroup, Radio, Input, Textarea } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {

    return {
        props : {

        }
    }
}

export default function Page({}) {
    const [cat, setCat] = useState("0");
    const [subCat, setSubCat] = useState("-1");
    const [subCatList, setSubCatList] = useState([]);
    useEffect(() => {
        if(cat != "0"){
            setSubCat("0");
            
        }

    }, [cat]);
    return (
        <SubPageLayout className="place-content-center"cat={undefined} subCat={undefined}>
            <CreationMainMenu setCat={setCat} cat={cat} setSubCatList={setSubCatList}/> 
            <CreationSubMenu setSubCat={setSubCat} subCat={subCat} subCatList={subCatList}/>
            <CreatePost cat={cat} subCat={subCat}/>
        </SubPageLayout>

    );
}

export function CreationMainMenu({setCat, cat, setSubCatList}){ // WHat type of posting is this (categories)
    const handleChange = async (event) => {
        console.log("Selected value is ", event.target.value);
        setCat(event.target.value);

        if(event.target.value != "0"){
            try {
                const res = await fetch(`http://localhost:3000/api/getCategoryInfo?cat=${event.target.value}`);
                const data = await res.json();
                console.log(data);
                setSubCatList(data); // Update subCatList here
            } catch (error) {
                console.error(error);   
            }
        }
    }
        

    return(
        <div>
            {cat === "0" && 
            <div>
            <h3><b>What Category will this go to?</b></h3>
            <div className="flex flex-col">
                <RadioGroup onChange={handleChange} defaultValue="0">
                <Radio value="1">Community</Radio>
                <Radio value="2">Housing</Radio>
                <Radio value="3">Services</Radio>
                <Radio value="4">For Sale</Radio>
                <Radio value="5">Jobs</Radio>
                </RadioGroup>
                
            </div>
            </div>}
        </div>
    )
}

export function CreationSubMenu({setSubCat, subCat, subCatList}){ //please choose a category (subcategory)
    const handleChange = (event) => {
        console.log("Selected value subCat is ", event.target.value);
        setSubCat(event.target.value);
        
    }
    return(
        <div>
            {subCat === "0" && 
            <div>
                <h3><b>What Sub Category will this go to?</b></h3>
                <RadioGroup onChange={handleChange} defaultValue="0">
                {subCatList && 
                subCatList.map((data) =>(
                    <Radio key={data.SUBCATEGORYID} value={data.SUBCATEGORYID}>{data.SUBCATEGORY}</Radio>
                ))
                }
                </RadioGroup>
            </div>
            }
        </div>
    )
}

export function CreatePost({cat, subCat}){
    return(
        <div>
            {cat === "1" && subCat!=0 && <CreateCommunityPost subCat={subCat}/>}
        </div>
    )
}

export function CreateCommunityPost({subCat}){ 
    return(
        <div>
            <CommonFields/>
            {subCat === "3" && 
            <div>
            Child Care Data!
            </div>}
        </div>
    )
}

export function CommonFields(){ // post title, location, post description, contact info
    return(
        <div>
            <div className="flex flex-row mb-5"><Input className="mr-10" isRequired radius="none" label="Post Title" labelPlacement="outside"></Input> <Input className="mr-10" isRequired radius="none" label="Address" labelPlacement="outside"></Input> <Input isReadOnly radius="none" label="City" labelPlacement="outside" defaultValue="Philadelphia"/></div>
            <div><Textarea radius="none" label="description" labelPlacement="outside" ></Textarea></div>
        </div>
    )
}