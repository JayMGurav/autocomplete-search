import { create } from 'zustand'
import { Book } from '../types'

type State = {
    books: Array<Book>
}
  
type Actions = {
  isBookInSelf: (bookId: string) => boolean,
  addBook: (book: Book) => void
  removeBook: (bookId: string) => void
}
  
const useBookStore = create<State & Actions>((set, get) => ({
  books: [],
  isBookInSelf: (bookId: string) => Boolean(get().books?.find(({id}) => id == bookId)),
  addBook: (book: Book) => set((state) => ({books: state.books.concat([book])})),
  removeBook: (bookId: string) => set((state) => ({books: state.books.filter(({ id } : { id: string }) => id != bookId)}))
}))

export default useBookStore;