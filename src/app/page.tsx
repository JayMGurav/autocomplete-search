'use client';

import SearchInput from './input';
import OramaProvider from '@/context/orama';

export default async function Home() {
  return ( 
    <main className="flex min-h-screen px-[calc((100%-900px)/2)]">
      <div className='w-full pt-10'>
        <OramaProvider>
          <SearchInput msg="hwllo world" />
        </OramaProvider>
      </div>
    </main>
  );
}