import { UserIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Officer', value: 'officer' },
          { title: 'Director', value: 'director' },
          { title: 'Advisor', value: 'advisor' },
          { title: 'Blog Author', value: 'blogAuthor' },
        ],
        layout: 'radio'
      },
      initialValue: 'blogAuthor'
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      description: 'Role title like "Founding Chairman" or "Vice Chairman". Primary label for Officers.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short bio or description. Used for Directors and Advisors.',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        }),
      ],
    }),
    defineField({
      name: 'discloseName',
      title: 'Disclose Name on Website?',
      type: 'boolean',
      initialValue: false,
      description: 'If turned off, the name will be hidden on the public website (e.g., replaced with "Anonymous" or stars).'
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || '★ (No Name provided)',
        media: media,
      }
    }
  },
})
