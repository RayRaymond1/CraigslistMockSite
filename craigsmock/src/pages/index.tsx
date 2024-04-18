import Image from "next/image";
import { Inter } from "next/font/google";
import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import Link from "next/link";
import '../app/globals.css'


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
    <div className="grid grid-flow-row grid-cols-3 content-start gap-4">
      <Card className="self-start">
        <CardHeader className="items-center">
          <div>
            <Link href="/search?cat=1&subCat=*">Community</Link>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <div className="grid grid-flow-row grid-cols-2 grid-rows-1 gap-4">
            <div><Link href="/search?cat=1&subCat=1">Activties</Link></div>
            <div><Link href="/search?cat=1&subCat=2">Artists</Link></div>
            <div><Link href="/search?cat=1&subCat=3">Childcare</Link></div>
            <div><Link href="/search?cat=1&subCat=4">Classes</Link></div>
            <div><Link href="/search?cat=1&subCat=5">Events</Link></div>
            <div><Link href="/search?cat=1&subCat=6">General</Link></div>
            <div><Link href="/search?cat=1&subCat=7">Groups</Link></div>
            <div><Link href="/search?cat=1&subCat=8">Local News</Link></div>
            <div><Link href="/search?cat=1&subCat=9">Lost + Found</Link></div>
            <div><Link href="/search?cat=1&subCat=10">Missed Connections</Link></div>
            <div><Link href="/search?cat=1&subCat=11">Musicians</Link></div>
            <div><Link href="/search?cat=1&subCat=12">Pets</Link></div>
            <div><Link href="/search?cat=1&subCat=13">Politics</Link></div>
            <div><Link href="/search?cat=1&subCat=14">Rants & Raves</Link></div>
            <div><Link href="/search?cat=1&subCat=15">Rideshare</Link></div>
            <div><Link href="/search?cat=1&subCat=16">Volunteers</Link></div>
          </div>
        </CardBody>
      </Card>

      <Card className="self-start">
        <CardHeader className="items-center">
          <div>
            <Link href="/search?cat=2&subCat=*">Housing</Link>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <div className="grid grid-flow-row grid-cols-1 gap-4">
            <div><Link href="/search?cat=2&subCat=1">apts/housing</Link></div>
            <div><Link href="/search?cat=2&subCat=2">Housing Swap</Link></div>
            <div><Link href="/search?cat=2&subCat=3">Housing Wanted</Link></div>
            <div><Link href="/search?cat=2&subCat=4">Office / Commercial</Link></div>
            <div><Link href="/search?cat=2&subCat=5">Parking / Storage</Link></div>
            <div><Link href="/search?cat=2&subCat=6">Real Estate For Sale</Link></div>
            <div><Link href="/search?cat=2&subCat=7">Rooms / Shared</Link></div>
            <div><Link href="/search?cat=2&subCat=8">Rooms Wanted</Link></div>
            <div><Link href="/search?cat=2&subCat=9">Sublets / Temporary</Link></div>
            <div><Link href="/search?cat=2&subCat=10">Vacation Rentals</Link></div>
          </div>
        </CardBody>
      </Card>

      <Card className="self-start">
        <CardHeader className="items-center">
          <div>
            <Link href="/search?cat=3&subCat=*">Services</Link>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <div className="grid grid-flow-row grid-cols-2 gap-4">
            <div><Link href="/search?cat=3&subCat=1">Automotive</Link></div>
            <div><Link href="/search?cat=3&subCat=2">Beauty</Link></div>
            <div><Link href="/search?cat=3&subCat=3">Cell / Mobile</Link></div>
            <div><Link href="/search?cat=3&subCat=4">Computer</Link></div>
            <div><Link href="/search?cat=3&subCat=5">Creative</Link></div>
            <div><Link href="/search?cat=3&subCat=6">Cycle</Link></div>
            <div><Link href="/search?cat=3&subCat=7">Events</Link></div>
            <div><Link href="/search?cat=3&subCat=8">Farm + Garden</Link></div>
            <div><Link href="/search?cat=3&subCat=9">Financial</Link></div>
            <div><Link href="/search?cat=3&subCat=10">Health/Well</Link></div>
            <div><Link href="/search?cat=3&subCat=11">Household</Link></div>
            <div><Link href="/search?cat=3&subCat=12">Labor / Move</Link></div>
            <div><Link href="/search?cat=3&subCat=13">Legal</Link></div>
            <div><Link href="/search?cat=3&subCat=14">Lessons</Link></div>
            <div><Link href="/search?cat=3&subCat=15">Marine</Link></div>
            <div><Link href="/search?cat=3&subCat=16">Pet</Link></div>
            <div><Link href="/search?cat=3&subCat=17">Real Estate</Link></div>
            <div><Link href="/search?cat=3&subCat=18">Skilled Trade</Link></div>
            <div><Link href="/search?cat=3&subCat=19">Sm Biz Ads</Link></div>
            <div><Link href="/search?cat=3&subCat=20">Travel / Vac </Link></div>
            <div><Link href="/search?cat=3&subCat=21">Write / Ed  Tran</Link></div>
          </div>
        </CardBody>
      </Card>

      <Card className="self-start">
        <CardHeader className="items-center">
          <div>
            <Link href="/search?cat=4&subCat=*">For Sale</Link>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <div className="grid grid-flow-row grid-cols-2 gap-4">
            <div><Link href="/search?cat=4&subCat=1">Antiques</Link></div>
            <div><Link href="/search?cat=4&subCat=2">Appliances</Link></div>
            <div><Link href="/search?cat=4&subCat=3">Arts + Crafts</Link></div>
            <div><Link href="/search?cat=4&subCat=4">ATV/UTV/SNO</Link></div>
            <div><Link href="/search?cat=4&subCat=5">Auto Parts</Link></div>
            <div><Link href="/search?cat=4&subCat=6">Aviation</Link></div>
            <div><Link href="/search?cat=4&subCat=7">Baby + Kid</Link></div>
            <div><Link href="/search?cat=4&subCat=8">Barter</Link></div>
            <div><Link href="/search?cat=4&subCat=9">Beaulty + Health</Link></div>
            <div><Link href="/search?cat=4&subCat=10">Bike Parts</Link></div>
            <div><Link href="/search?cat=4&subCat=11">Bikes</Link></div>
            <div><Link href="/search?cat=4&subCat=12">Boat Parts</Link></div>
            <div><Link href="/search?cat=4&subCat=13">Boats</Link></div>
            <div><Link href="/search?cat=4&subCat=14">Books</Link></div>
            <div><Link href="/search?cat=4&subCat=15">Business</Link></div>
            <div><Link href="/search?cat=4&subCat=16">Cars + Trucks</Link></div>
            <div><Link href="/search?cat=4&subCat=17">CDs/DVD/VHS</Link></div>
            <div><Link href="/search?cat=4&subCat=18">Cell Phones</Link></div>
            <div><Link href="/search?cat=4&subCat=19">Clothes + Acc</Link></div>
            <div><Link href="/search?cat=4&subCat=20">Collectables</Link></div>
            <div><Link href="/search?cat=4&subCat=21">Computer Parts</Link></div>
            <div><Link href="/search?cat=4&subCat=22">Computers</Link></div>
            <div><Link href="/search?cat=4&subCat=23">Electronics</Link></div>
            <div><Link href="/search?cat=4&subCat=24">Farm + Garden</Link></div>
            <div><Link href="/search?cat=4&subCat=25">Free</Link></div>
            <div><Link href="/search?cat=4&subCat=26">Furniture</Link></div>
            <div><Link href="/search?cat=4&subCat=27">Garage Sale</Link></div>
            <div><Link href="/search?cat=4&subCat=28">General</Link></div>
            <div><Link href="/search?cat=4&subCat=29">Heavy Equipment</Link></div>
            <div><Link href="/search?cat=4&subCat=30">Household</Link></div>
            <div><Link href="/search?cat=4&subCat=31">Jewelry</Link></div>
            <div><Link href="/search?cat=4&subCat=32">Materials</Link></div>
            <div><Link href="/search?cat=4&subCat=33">Motorcycle Parts</Link></div>
            <div><Link href="/search?cat=4&subCat=34">Motorcycles</Link></div>
            <div><Link href="/search?cat=4&subCat=35">Music Instruments</Link></div>
            <div><Link href="/search?cat=4&subCat=36">Photo + Video</Link></div>
            <div><Link href="/search?cat=4&subCat=37">RVs + Camps</Link></div>
            <div><Link href="/search?cat=4&subCat=38">Sporting</Link></div>
            <div><Link href="/search?cat=4&subCat=39">Tickets</Link></div>
            <div><Link href="/search?cat=4&subCat=40">Toys + Games</Link></div>
            <div><Link href="/search?cat=4&subCat=41">Trailers</Link></div>
            <div><Link href="/search?cat=4&subCat=42">Video Gaming</Link></div>
            <div><Link href="/search?cat=4&subCat=43">Wanted</Link></div>
            <div><Link href="/search?cat=4&subCat=44">Wheels and Tires</Link></div>
          </div>
        </CardBody>
      </Card>

      <Card className="self-start">
        <CardHeader className="items-center">
          <div>
            <Link href="/search?cat=5&subCat=*">Jobs</Link>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <div className="grid grid-flow-row grid-cols-2 gap-4">
            <div><Link href="/search?cat=5&subCat=1">Accounting</Link></div>
            <div><Link href="/search?cat=5&subCat=2">Admin / Office</Link></div>
            <div><Link href="/search?cat=5&subCat=3">Arch / Engineering</Link></div>
            <div><Link href="/search?cat=5&subCat=4">Art / Media / Design</Link></div>
            <div><Link href="/search?cat=5&subCat=5">Biotech / Science</Link></div>
            <div><Link href="/search?cat=5&subCat=6">Business / Mgmt</Link></div>
            <div><Link href="/search?cat=5&subCat=7">Customer Service</Link></div>
            <div><Link href="/search?cat=5&subCat=8">Education</Link></div>
            <div><Link href="/search?cat=5&subCat=9">Etc / Misc</Link></div>
            <div><Link href="/search?cat=5&subCat=10">Food / Bev / Hosp</Link></div>
            <div><Link href="/search?cat=5&subCat=11">General Labor</Link></div>
            <div><Link href="/search?cat=5&subCat=12">Government</Link></div>
            <div><Link href="/search?cat=5&subCat=13">Human Resources</Link></div>
            <div><Link href="/search?cat=5&subCat=14">Legal / Paralegal</Link></div>
            <div><Link href="/search?cat=5&subCat=15">Manufacturing</Link></div>
            <div><Link href="/search?cat=5&subCat=16">Marketing / PR / Ad</Link></div>
            <div><Link href="/search?cat=5&subCat=17">Medical / Health</Link></div>
          </div>
        </CardBody>
      </Card>
    </div>
  );

} 