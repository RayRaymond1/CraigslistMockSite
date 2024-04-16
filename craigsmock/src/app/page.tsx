import Image from "next/image";
import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import Link from "next/link";
import './globals.css'


export default function Home() {
  return (
    <main className="flex p-24">
      <LeftBar/>
      <MiddleContent/>
      <RightBar/>
    </main>
  );
}

export function LeftBar(){
  return(
    <div className="flex flex-col items-center bg-slate-200 border-x-2 border-slate-500 p-5 "> 
      <div className="flex items-center place-content-center mb-5"><Image src="/testemblem.png" height={50} width={50} alt=""/> <a href="/">Ray's List</a></div>
      <div className="flex items-center place-content-center bg-white mb-10 p-2"><Image src="/compose.svg" height={30} width={30} alt=""/><h2 className="text-center text-teal-500"><a href="/createPost">Post an ad</a></h2></div>
      
      <div className="mb-1"><a href="/faq">help, faq, abuse, legal</a></div>
      <div className="mb-1"><a href="/safety">avoid scams & fraud</a></div>
      <div className="mb-10"><a href="/tips">personal safety tips</a></div>

      <div className="mb-1"><a href="/about">about ray's list</a></div>
      <div className="mb-1"><a href="/patchNotes">what's new</a></div>
      <div className="mb-1"><a href="/status">system status</a></div>
    </div>
  );
}

export function RightBar(){
  return (
    <div className="flex justify-between bg-slate-200 border-x-2 border-slate-500 w-1/6">
        Hello
    </div>
  );
}

export function MiddleContent(){
  return(
    <div className="grid grid-flow-row grid-cols-2 content-start gap-4">
    <Card className="self-start">
      <CardHeader className="items-center">
        <div><Link href="/search?cat=Community" >Community</Link></div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="grid grid-flow-row grid-cols-2 grid-rows-1 gap-4">
          <div>Activties</div>
          <div>Artists</div>
          <div>Childcare</div>
          <div>Classes</div>
          <div>Events</div>
          <div>General</div>
          <div>Groups</div>
          <div>Local News</div>
          <div>Lost + Found</div>
          <div>Missed Connections</div>
          <div>Musicians</div>
          <div>Pets</div>
          <div>Politics</div>
          <div>Rants & Raves</div>
          <div>Rideshare</div>
          <div>Volunteers</div>
        </div>
      </CardBody>
      </Card>

      <Card className="self-start">
      <CardHeader className="items-center">
        <div><p>Housing</p></div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="grid grid-flow-row grid-cols-1 gap-4">
          <div className="">apts/housing</div>
          <div className="">Housing Swap</div>
          <div>Housing Wanted</div>
          <div>Office / Commercial</div>
          <div>Parking / Storage</div>
          <div>Real Estate For Sale</div>
          <div>Rooms / Shared</div>
          <div>Rooms Wanted</div>
          <div>Sublets / Temporary</div>
          <div>Vacation Rentals</div>
        </div>
      </CardBody>
      </Card>

      <Card className="self-start">
      <CardHeader className="items-center">
        <div><p>Services</p></div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <div>Automotive</div>
          <div>Beauty</div>
          <div>Cell / Mobile</div>
          <div>Computer</div>
          <div>Creative</div>
          <div>Cycle</div>
          <div>Events</div>
          <div>Farm + Garden</div>
          <div>Financial</div>
          <div>Health/Well</div>
          <div>Household</div>
          <div>Labor / Move</div>
          <div>Legal</div>
          <div>Lessons</div>
          <div>Marine</div>
          <div>Pet</div>
          <div>Real Estate</div>
          <div>Skilled Trade</div>
          <div>Sm Biz Ads</div>
          <div>Travel / Vac </div>
          <div>Write / Ed  Tran</div>
        </div>
      </CardBody>
      </Card>

      <Card className="self-start">
      <CardHeader className="items-center">
        <div><p>For Sale</p></div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <div>Antiques</div>
          <div>Appliances</div>
          <div>Arts + Crafts</div>
          <div>ATV/UTV/SNO</div>
          <div>Auto Parts</div>
          <div>Aviation</div>
          <div>Baby + Kid</div>
          <div>Barter</div>
          <div>Beaulty + Health</div>
          <div>Bike Parts</div>
          <div>Bikes</div>
          <div>Boat Parts</div>
          <div>Boats</div>
          <div>Books</div>
          <div>Business</div>
          <div>Cars + Trucks</div>
          <div>CDs/DVD/VHS</div>
          <div>Cell Phones</div>
          <div>Clothes + Acc</div>
          <div>Collectables</div>
          <div>Computer Parts</div>
          <div>Computers</div>
          <div>Electronics</div>
          <div>Farm + Garden</div>
          <div>Free</div>
          <div>Furniture</div>
          <div>Garage Sale</div>
          <div>General</div>
          <div>Heavy Equipment</div>
          <div>Household</div>
          <div>Jewelry</div>
          <div>Materials</div>
          <div>Motorcycle Parts</div>
          <div>Motorcycles</div>
          <div>Music Instruments</div>
          <div>Photo + Video</div>
          <div>RVs + Camps</div>
          <div>Sporting</div>
          <div>Tickets</div>
          <div>Toys + Games</div>
          <div>Trailers</div>
          <div>Video Gaming</div>
          <div>Wanted</div>
          <div>Wheels and Tires</div>
        </div>
      </CardBody>
      </Card>

      <Card className="self-start">
      <CardHeader className="items-center">
        <div><p>For Sale</p></div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <div>Accounting</div>
          <div>Admin / Office</div>
          <div>Arch / Engineering</div>
          <div>Art / Media / Design</div>
          <div>Biotech / Science</div>
          <div>Business / Mgmt</div>
          <div>Customer Service</div>
          <div>Education</div>
          <div>Etc / Misc</div>
          <div>Food / Bev / Hosp</div>
          <div>General Labor</div>
          <div>Government</div>
          <div>Human Resources</div>
          <div>Legal / Paralegal</div>
          <div>Manufacturing</div>
          <div>Marketing / PR / Ad</div>
          <div>Medical / Health</div>
        </div>
      </CardBody>
      </Card>

    </div>
  );
} 