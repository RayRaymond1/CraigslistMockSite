import SubPageLayout from "@/layouts/subPageLayout";
import { GetServerSideProps } from "next";

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

    console.log(data);
    return {
        props : {
            data
        }
    }
}

export default function Page({ data }) {
    return (
        <SubPageLayout className="place-content-center" cat={undefined} subCat={undefined}>
            <div>
                Hello!
            </div>
        </SubPageLayout>

    );
}