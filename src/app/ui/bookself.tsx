'use client';

import useBookStore from "@/state/book-self"
import { Book } from "@/types";

function BookSelf() {
    const {books, removeBook}: {books:Array<Book>, removeBook: (bookId: string) => void} = useBookStore(({books, addBook, removeBook}) => ({books, addBook, removeBook}))

    
    return (
        <div className="border-l border-neutral-800 h-full p-4 ">
            <h1 className="font-medium text-2xl text-neutral-300 my-4 ">Bookself.</h1>
            {books?.length == 0 && <div className="h-40 font-medium grid place-content-center text-center border rounded-md border-neutral-800">
                <p>No Books in Self</p>
                <span className="text-neutral-600">Go search for book and add to the bookself.</span>
            </div>}
            {books?.length > 0 && <div className="grid grid-cols-4 gap-4">
                {books?.map(({id, title, author, summary}) => (
                    <div key={`${id}-${title}`} className="h-40 flex flex-col p-2 bg-neutral-800 rounded-md  border border-neutral-700 hover:scale-105 transition-transform">
                        <h2>{title}</h2>
                        <span className="mt-2 text-sm justify-self-end text-neutral-500">By: {author}</span>
                        <button 
                            onClick={() => removeBook(id)}
                            className="mt-auto self-end py-1 px-2 bg-black border border-neutral-700 text-xs rounded-md cursor-pointer"
                        >remove</button>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default BookSelf;