import Image from "next/image";
import './globals.css'


export default function Home() {
  return (
    <main className="flex items-center  p-24">
      <LeftBar/>
      <TopBar/>
      <NearbyBar/>
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

export function NearbyBar(){
  return (
    <div className="flex justify-between bg-slate-200 border-x-2 border-slate-500 w-1/6">
        Hello
    </div>
  );
}

export function TopBar(){
  return(
    <div className="flex justify-between bg-slate-200 border-x-2 border-slate-500 mx-1 w-2/3">
      <p className="text-4xl">Philadelphia</p>
      <div><a href="/"><Image src="/compose.svg" height={50} width={50} alt=""/>Ray's List</a></div>
    </div>
  );
}