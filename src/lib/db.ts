import {  TypedDocument, Orama, Results, SearchParams, create } from '@orama/orama'

export type BookDocument = TypedDocument<Orama<typeof bookSchema>>

export const bookSchema = {
  id: 'string',
  title: 'string',
  summary: 'string',
} as const

// export async function initBookDB() {
//   const bookDB: Orama<typeof bookSchema> = await create({
//     schema: {
//       id: 'string',
//       title: 'string',
//       summary: 'string',
//     } as const,
//   });
//   return bookDB;
// }