'use client';

import { OramaContext } from "@/context/orama";
import { BookDocument } from "@/lib/db";
import { Book } from "@/types";
import { Results } from "@orama/orama";
import { ChangeEvent, useContext, useState } from "react";
import useBookStore from "@/state/book-self"

function SearchInput() {
    const orama = useContext(OramaContext)
    const [value, setValue] = useState<string>('');
    const [selectedSearchResult, setSelectedSearchResult] = useState<number>(0)
    const [searchResults, setSearchResults] = useState<Results<BookDocument>>();
    const { addBook, isBookInSelf } = useBookStore(({ addBook, isBookInSelf}) =>({ addBook, isBookInSelf}))

    async function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
        const result = await orama?.searchBook(e.target.value)
        setSearchResults(result);
    }

    return (
        <div className="relative pb-2">
            <label htmlFor="search_input" className="text-sm">Search Books</label>
            <input id="search_input" type="text" value={value} onChange={handleInputChange} placeholder="The Richest Man in Babylon" className="w-full text-neutral-200 bg-neutral-900 px-2  py-2 rounded-md placeholder:text-neutral-700"/>
            {searchResults?.count == 0 && <div className="h-40 font-medium grid place-content-center">No results found</div>}
            {value && searchResults && searchResults?.count > 0 && <div className="bg-neutral-900 p-3 absolute top-[110%] left-0 right-0 z-10 rounded-md shadow-md">
                <div className="border-b border-neutral-700 p-3 text-xs text-neutral-500 text-right">
                Showing top {searchResults?.hits?.length} matches of {searchResults?.count}
                </div>
                <div className="w-full flex gap-2">
                    <ul className="flex-1 py-3">
                        {searchResults?.hits?.map(({ document }, i) => <li 
                            key={document.title} 
                            onClick={() => setSelectedSearchResult(i)} 
                            className={`bg-neutral-800 border border-neutral-700 p-2 mb-2 rounded-md cursor-pointer hover:border-neutral-500 ${selectedSearchResult == i && "bg-neutral-700 border-neutral-500"}`}
                        >{document.title}
                        </li>)}
                    </ul>
                    <div className="flex flex-col gap-2 p-3 flex-1 border-l border-neutral-700">
                        <span className="text-right text-xs bg-neutral-800 border border-neutral-700 w-fit px-2 rounded-xl">Match Score: {Math.round((searchResults?.hits?.[selectedSearchResult]?.score + Number.EPSILON) * 100) / 100}</span>
                        <p className="my-4 flex-1">{searchResults?.hits?.[selectedSearchResult]?.document?.summary}</p>
                        <div className="text-right self-end justify-self-end">
                            {
                                !isBookInSelf(searchResults?.hits?.[selectedSearchResult]?.document?.id) ?
                                <button className="bg-black p-2 text-sm rounded-md border border-neutral-800" onClick={() => addBook(searchResults?.hits?.[selectedSearchResult]?.document as Book)}>
                                    Add to Bookself
                                </button> :
                                <span className="text-sm text-neutral-500">Book pressent in Bookself</span>
                            }
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default SearchInput;