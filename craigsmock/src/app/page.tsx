import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LeftBar/>
    </main>
  );
}

export function LeftBar(){
  return(
    <div className=""> hello!</div>
  );
}