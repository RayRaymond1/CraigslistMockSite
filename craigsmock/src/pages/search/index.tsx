import { GetServerSideProps } from "next";
import SidebarComponent from "../../app/search/sidebarComponent/sidebar";
import SearchLayout from "@/layouts/searchlayout";

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

  const res = await fetch(`http://localhost:3000/api/search?cat=${cat}&subCat=${subCat}`);
  const data = await res.json();

  //console.log(data); // Log the response data

  return {
    props: {
      cat,
      subCat
    },
  };
}; 


export default function Page({ cat, subCat }) {
    return (
        <div className="flex">
          <SearchLayout cat={cat} subCat={subCat}>
            <SidebarComponent/>
            Insert table data!
          </SearchLayout>
        </div>
    );
}
