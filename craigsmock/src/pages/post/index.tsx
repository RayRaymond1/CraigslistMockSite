import SubPageLayout from "@/layouts/subPageLayout";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import Router from "next/router";
dayjs.extend(relativeTime);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { postID } = context.query;
    if (!postID) {
        console.error("Missing required query parameter: PostID")

        return{
            props: {},
            redirect: {
                destination: '/',
                permanent: false
            }
        }

    }

    const res = await fetch(`http://localhost:3000/api/getPost?postID=${postID}`);
    const data = await res.json();

    //console.log(data);
    return {
        props : {
            data
        }
    }
}

export default function Page({ data }) {
    return (
        <SubPageLayout className="place-content-center" cat={data.category} subCat={data.subcategory} createPost={false}>
            <div>
                <CommonFields data={data}/>
            </div>
        </SubPageLayout>

    );
}


export function CommonFields({ data }) { // post title, location, post description, contact info
    
    const deletePost = () =>
        {
            const postIDtoDelete = { postID : data.postID}
            fetch(`http://localhost:3000/api/deletePost`, {
                method: 'DELETE',
                body: JSON.stringify(postIDtoDelete)
            });

            Router.push("/");
        }

    const updatePost = () =>
        {
            Router.push(`/updatePost?postID=${data.postID}`);
        }

    return (
        <div className="flex flex-col  w-96">
            <div className="flex place-content-center"><Button onClick={updatePost} color="primary" className="mr-5">Update</Button> <Button onClick={deletePost} color="warning">Delete</Button></div>
            <div className="flex flex-row mb-5 justify-between w-full">
                <h3 className=""><b>{data.title}</b></h3> <h2>Posted about {dayjs(data.postdate).fromNow()}</h2>

            </div>
            <div className="mb-5 "><p className="whitespace-pre-line">{data.postText}</p></div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between"><h3><b>Email: </b>{data.email}</h3> <h3><b>Address: </b>{data.address}</h3></div>
                {data.phoneNumber  != null ? <h3><b>Phone Number: </b> {data.phoneNumber}</h3> : <div></div>}
                {data.phoneTextOk  === 1 ? <h3><b>Phone Calls Ok! </b></h3> : <div></div>}
                {data.phoneTextOk  === 1 ? <h3><b>Phone Texts Ok! </b></h3> : <div></div>}
            </div>
        </div>
    )
}