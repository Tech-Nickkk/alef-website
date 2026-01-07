import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const podcastType = defineType({
    name: 'podcast',
    title: 'Podcast',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
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
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})
