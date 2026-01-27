import { defineField, defineType } from 'sanity'

export const podcastType = defineType({
    name: 'podcast',
    title: 'Podcast',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'localizedString',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title.en',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video Link',
            type: 'url',
            description: 'Link to the podcast video/episode (e.g. YouTube, Spotify, etc.)',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'date',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
        },
        prepare(selection) {
            const { title } = selection
            return {
                title: title || 'Untitled Podcast',
            }
        }
    },
})
