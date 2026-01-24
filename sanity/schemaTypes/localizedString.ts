import { defineType, defineField } from 'sanity'

const languages = [
    { id: 'en', title: 'English', isDefault: true },
    { id: 'ar', title: 'Arabic' },
    { id: 'fr', title: 'French' },
    { id: 'es', title: 'Spanish' },
]

export const localizedString = defineType({
    name: 'localizedString',
    title: 'Localized String',
    type: 'object',
    fields: languages.map((lang) =>
        defineField({
            name: lang.id,
            title: lang.title,
            type: 'string',
        })
    ),
})
