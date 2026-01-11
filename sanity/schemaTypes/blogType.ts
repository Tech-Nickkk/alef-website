import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'date',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (Short Summary)',
      type: 'text',
      rows: 3,
      description: 'This ends up on the card in the blog list.',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
})