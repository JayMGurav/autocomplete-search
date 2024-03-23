'use client';

import { OramaContext } from "@/context/orama";
import { BookDocument } from "@/lib/db";
import { Results } from "@orama/orama";
import { ChangeEvent, useContext, useState } from "react";


function SearchInput({msg}:{msg:string}) {
    const [value, setValue] = useState<string>('');
    const orama = useContext(OramaContext)
    const [searchResults, setSearchResults] = useState<Results<BookDocument>>();

    async function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
        
        const result = await orama?.searchBook(e.target.value)
        setSearchResults(result);
    }
    
    return (
        <div className="relative">
            <label htmlFor="search_input" className="text-sm">Search Books</label>
            <input id="search_input" type="text" value={value} onChange={handleInputChange} className="w-full text-neutral-200 bg-neutral-900 px-2  py-2 rounded-md"/>
            {value && <div className="bg-neutral-900 absolute top-[110%] left-0 right-0 z-10">
                <div>
                    {searchResults?.count}
                </div>
                <ul>
                    {searchResults?.hits?.map(({document, score}) => <li key={document.title} >{document.title} |||| {score}</li>)}
                </ul>
            </div>}
        </div>
    )
}

export default SearchInput;