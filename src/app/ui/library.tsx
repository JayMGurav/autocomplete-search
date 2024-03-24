'use client';

import SearchInput from './input';
import BookSelf from './bookself';

import OramaProvider from '@/context/orama';

function Library() {
    return (
        <OramaProvider>
          <div className='flex h-full w-full'>
            <div className='flex-1 p-4'>
                <SearchInput />
            </div>
            <div className='flex-1 p-4'>
                <BookSelf/>
            </div>
          </div>
        </OramaProvider>
    )
}


export default Library;