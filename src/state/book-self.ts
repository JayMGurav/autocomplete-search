import { create } from 'zustand'
import { Book } from '../types'

type State = {
    books: Array<Book>
}
  
type Actions = {
  addBook: (book: Book) => void
  removeBook: (bookId: string) => void
}
  
const useBookStore = create<State & Actions>((set) => ({
  books: [],
  addBook: (book: Book) => set((state) => ({books: state.books.concat([book])})),
  removeBook: (bookId: string) => set((state) => ({books: state.books.filter(({ id } : { id: string }) => id != bookId)}))
}))

export default useBookStore;