import Library from "./ui/library";


export default async function Home() {
  return ( 
    <main className="flex  min-h-screen px-4 ">
      <div className='w-full pt-10'>
        <Library/>
      </div>
    </main>
  );
}