import { GetServerSideProps } from "next";
import SidebarComponent from "../../app/search/sidebarComponent/sidebar";
import SubPageLayout from "@/layouts/subPageLayout";
import { Card, CardBody } from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from "next/link";
dayjs.extend(relativeTime);
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cat, subCat } = context.query;

  //console.log(cat, subCat);

  if (!cat || !subCat) {
    console.error("Missing required query parameters: cat or subCat");
    return {
      props: {},
      redirect: {
        destination: '/error-page',
        permanent: false,
      },
    };
  }

  const res = await fetch(`http://localhost:3000/api/basicSearch?cat=${cat}&subCat=${subCat}`);
  const data = await res.json();

  //console.log(data); // Log the response data

  return {
    props: {
      cat,
      subCat,
      data
    },
  };
}; 

//need to let what 

export default function Page({ cat, subCat, data }) {
  return (
    <div>
      <SubPageLayout cat={cat} subCat={subCat}>
        <SidebarComponent />
        <div className="w-5/6">
          {data.map((data) => (
            <Card className="flex" key={data.POSTID}>
              <CardBody className="flex-row">
                <Link className="flex-row" href={`/post?postID=${data.POSTID}`}><h4 className="mr-5"><b>{data.TITLE}</b></h4> <p className="mr-5">{data.ADDRESS}</p> <p className="mr-5">{dayjs(data.POSTDATE).fromNow()}</p> {data.HASIMAGE ? <p>Has Image</p> : null}</Link>
              </CardBody>
            </Card>
          ))}
        </div>

      </SubPageLayout>
    </div>
  );
}
