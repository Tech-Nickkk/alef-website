import { defineType, defineField } from 'sanity'

const languages = [
    { id: 'en', title: 'English', isDefault: true },
    { id: 'ar', title: 'Arabic' },
    { id: 'fr', title: 'French' },
    { id: 'es', title: 'Spanish' },
]

export const localizedBlockContent = defineType({
    name: 'localizedBlockContent',
    title: 'Localized Block Content',
    type: 'object',
    fields: languages.map((lang) =>
        defineField({
            name: lang.id,
            title: lang.title,
            type: 'blockContent',
        })
    ),
})
