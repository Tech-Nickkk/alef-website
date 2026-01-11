import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('ALEF Studio')
    .items([
      S.documentTypeListItem('blog').title('Blogs'),
      S.documentTypeListItem('author').title('Authors'),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['blog', 'author'].includes(item.getId()!),
      ),
    ])
