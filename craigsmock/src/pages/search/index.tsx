import { GetServerSideProps } from "next";
import SidebarComponent from "../../app/search/sidebarComponent/sidebar";
import SearchLayout from "@/layouts/searchlayout";
import { Card, CardBody } from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cat, subCat } = context.query;

  //console.log(cat, subCat);

  if (!cat || !subCat) {
    // Handle the case when cat or subCat is missing
    console.error("Missing required query parameters: cat or subCat");
    // You can return an error response or handle it as appropriate
    return {
      props: {},
      // You can also redirect to an error page if necessary
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
      <SearchLayout cat={cat} subCat={subCat}>
        <SidebarComponent />
        <div className="w-5/6">
          {data.map((data) => (
            <Card className="flex" key={data.POSTID}>
              <CardBody className="flex-row">
                <h4 className="mr-5"><b>{data.TITLE}</b></h4> <p className="mr-5">{data.ADDRESS}</p> <p className="mr-5">{dayjs(data.POSTDATE).fromNow()}</p> {data.HASIMAGE ? <p>Has Image</p> : null}
              </CardBody>
            </Card>
          ))}
        </div>

      </SearchLayout>
    </div>
  );
}
