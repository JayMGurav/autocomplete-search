import { createContext, useEffect, useRef, useCallback } from "react";
import {  Orama,  search, create, insertMultiple } from '@orama/orama'
import { bookSchema } from "@/lib/db";
import bookData from "../../newData.json"
import { Book } from "@/types";

interface OramaContextType {
    bookDB: Orama<typeof bookSchema> | null,
    searchBook: any;
}

export const OramaContext = createContext<OramaContextType>({
    bookDB: null,
    searchBook: undefined,
});

function OramaProvider({children}: {children:any}) {
    const oramaRef = useRef<(Orama<typeof bookSchema>) | null>(null);

      useEffect(() => {
        (async () => {
            const bookDB: Orama<typeof bookSchema> = await create({
                schema: {
                  id: 'string',
                  title: 'string',
                  summary: 'string',
                } as const,
            });
            await insertMultiple(bookDB, bookData)
            oramaRef.current = bookDB;
        })()
      }, [])


    const searchBook = useCallback(async function(term:string) {
        if(oramaRef.current){
            const result = await search<typeof oramaRef.current, Book>(oramaRef.current, {term})
            return {
                count: result?.count,
                hits: result?.hits
            }
        } else{
            throw new Error("Orama not initiated");
        }
    }, [oramaRef.current])
    
    return (
        <OramaContext.Provider value={{
            bookDB: oramaRef.current,
            searchBook
        }}>
            {children}
        </OramaContext.Provider>
    )
}




export default OramaProvider;