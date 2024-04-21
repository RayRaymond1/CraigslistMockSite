import SubPageLayout from "@/layouts/subPageLayout";
import { RadioGroup, Radio, Input, Textarea, Select, SelectItem, Checkbox, Button } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import Router from "next/router";
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
        <SubPageLayout className="place-content-center"cat={cat} subCat={subCat} createPost={true}>
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
            {cat != "0" && subCat!="0" && <CreatePostForm cat={cat} subCat={subCat}/>}
        </div>
    )
}

export function CommonFields({ title, setTitle, address, setAddress, description, setDecription,
    email, setEmail, phoneNumberOk, setPhoneNumberOk, phoneNumber,
    setPhoneNumber, phoneCallOk, setPhoneCallOk, textOk, setTextOk }) { // post title, location, post description, contact info
    
    

    return (
        <div>
            <div className="flex flex-row mb-5">
                <Input className="mr-10" isRequired radius="none" label="Post Title" labelPlacement="outside" value={title} onValueChange={setTitle}></Input>
                <Input className="mr-10" isRequired radius="none" label="Address" labelPlacement="outside" value={address} onValueChange={setAddress}></Input>
                <Input isReadOnly radius="none" label="City" labelPlacement="outside" defaultValue="Philadelphia" />
            </div>
            <div><Textarea radius="none" label="description" labelPlacement="outside" value={description} onValueChange={setDecription}></Textarea></div>
            <div className="flex flex-row">
                <Input className="mr-10 w-1/3" size="md" isRequired radius="none" label="Email" labelPlacement="outside" value={email} onValueChange={setEmail}></Input>
                <div>
                    <div className="flex flex-row" >
                        <Checkbox size="md" value={phoneNumberOk} onValueChange={setPhoneNumberOk}>Show my Phone Number</Checkbox>
                        <Checkbox size="md" value={phoneCallOk} onValueChange={setPhoneCallOk}>Phone Calls Ok</Checkbox>
                        <Checkbox size="md" value={textOk} onValueChange={setTextOk}>Text/SMS Ok</Checkbox>
                    </div>
                    <Input className="mr-10" radius="none" label="Phone Number" labelPlacement="outside" value={phoneNumber} onValueChange={setPhoneNumber}></Input>
                </div>
            </div>
        </div>
    )
}

export function CreateCommunityPost({subCat}){ //unused not enough time to do specialized data
    //common fields
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDecription] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberOk, setPhoneNumberOk] = useState(false);
    const [phoneCallOk, setPhoneCallOk] = useState(false);
    const [textOk, setTextOk] = useState(false);

    //child care data
    const [age, setAge] = useState("");
    const [opening, setOpening] = useState(false);
    const [avaliability, setAvaliability] = useState("");
    const [provider, setProvider] = useState("");
    const [subsidy, setSubsidy] = useState(false);

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }

    const handleProviderChange= (event) => {
        setProvider(event.target.value);
    }
    const submitPost = () => {
        const commonFields = {
            title : title,
            category : 1,
            subCategory : subCat,
            description : description,
            email : email,
            phoneNumberOk: phoneNumberOk,
            phoneCallOk: phoneCallOk,
            textOk: textOk,
            phoneNumber: phoneNumber

        };
        console.log("Common Fields: ", commonFields);

        if(subCat === "3"){
            const childCareData = {
                age : {age},
                opening : {opening},
                avaliability : {avaliability},
                provider : {provider},
                subsidy : {subsidy}
            }

            const combinedData = {submitPost, childCareData};
            console.log("Child Care Data: ", childCareData);

            fetch(`http://localhost:3000/api/createPost`, {
                method: 'POST',
                body: JSON.stringify(combinedData)
            });
        } else {
            fetch(`http://localhost:3000/api/createPost`, {
                method: 'POST',
                body: JSON.stringify(commonFields)
            });
        }
    };

    return(
        <div>
            <CommonFields title={title} setTitle={setTitle} address={address} setAddress={setAddress}
             description={description} setDecription={setDecription} email={email} 
             setEmail={setEmail} phoneNumberOk={phoneNumberOk} setPhoneNumberOk={setPhoneNumberOk} 
             phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} phoneCallOk={phoneCallOk} 
             setPhoneCallOk={setPhoneCallOk} textOk={textOk} setTextOk={setTextOk}/>
            <div className="flex place-content-center mt-5">
                <Button onClick={submitPost}>Submit Post</Button>
            </div>
        </div>
    )
}

export function CreatePostForm({cat, subCat}){ 
    //common fields
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDecription] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberOk, setPhoneNumberOk] = useState(false);
    const [phoneCallOk, setPhoneCallOk] = useState(false);
    const [textOk, setTextOk] = useState(false);

    const submitPost = () => {
        const commonFields = {
            title: title,
            address : address,
            category: cat,
            subCategory: subCat,
            description: description,
            email: email,
            phoneNumberOk: phoneNumberOk,
            phoneCallOk: phoneCallOk,
            textOk: textOk,
            phoneNumber: phoneNumber

        };
        console.log("Common Fields: ", commonFields);


        fetch(`http://localhost:3000/api/createPost`, {
            method: 'POST',
            body: JSON.stringify(commonFields)
        });
        Router.push("/");
    };

    return(
        <div>
            <CommonFields title={title} setTitle={setTitle} address={address} setAddress={setAddress}
             description={description} setDecription={setDecription} email={email} 
             setEmail={setEmail} phoneNumberOk={phoneNumberOk} setPhoneNumberOk={setPhoneNumberOk} 
             phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} phoneCallOk={phoneCallOk} 
             setPhoneCallOk={setPhoneCallOk} textOk={textOk} setTextOk={setTextOk}/>
            <div className="flex place-content-center mt-5">
                <Button onClick={submitPost}>Submit Post</Button>
            </div>
        </div>
    )
}