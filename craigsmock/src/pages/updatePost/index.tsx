import SubPageLayout from "@/layouts/subPageLayout";
import { RadioGroup, Radio, Input, Textarea, Select, SelectItem, Checkbox, Button } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {postID} = context.query;

    if (!postID) {
        console.error("Missing required query parameters: postID");
        return {
          props: {},
          redirect: {
            destination: '/error-page',
            permanent: false,
          },
        };
    }
    return {
        props : {
            postID
        }
    }
}

export default function Page({postID}) {
    const [cat, setCat] = useState("");
    const [subCat, setSubCat] = useState("");
    const [subCatList, setSubCatList] = useState([]);
    return (
        <SubPageLayout className="place-content-center"cat={cat} subCat={subCat} createPost={true}>
            <CreatePostForm cat={cat} subCat={subCat} postID={postID} setCat={setCat} setSubCat={setSubCat}/>
        </SubPageLayout>

    );
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


export function CreatePostForm({cat, subCat, postID, setSubCat, setCat}){ 
    //common fields
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDecription] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberOk, setPhoneNumberOk] = useState(false);
    const [phoneCallOk, setPhoneCallOk] = useState(false);
    const [textOk, setTextOk] = useState(false);



    const updatePost = () => {
        const commonFields = {
            postID : postID,
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


        fetch(`http://localhost:3000/api/updatePost`, {
            method: 'PUT',
            body: JSON.stringify(commonFields)
        });
        Router.push("/");
    };

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getPost?postID=${postID}`);
                const postData = await response.json();
                // Set initial state values with post data
                setTitle(postData.title);
                setAddress(postData.address);
                setDecription(postData.postText);
                setEmail(postData.email);
                setPhoneNumber(postData.phoneNumber);
                setPhoneNumberOk(postData.phoneNumberOk);
                setPhoneCallOk(postData.phoneCallOk);
                setTextOk(postData.textOk);
                setCat(postData.categoryID);
                setSubCat(postData.subCategoryID);
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };
        fetchPostData();
    }, []);


    return(
        <div>
            <CommonFields title={title} setTitle={setTitle} address={address} setAddress={setAddress}
             description={description} setDecription={setDecription} email={email} 
             setEmail={setEmail} phoneNumberOk={phoneNumberOk} setPhoneNumberOk={setPhoneNumberOk} 
             phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} phoneCallOk={phoneCallOk} 
             setPhoneCallOk={setPhoneCallOk} textOk={textOk} setTextOk={setTextOk}/>
            <div className="flex place-content-center mt-5">
                <Button onClick={updatePost}>Submit Post</Button>
            </div>
        </div>
    )
}