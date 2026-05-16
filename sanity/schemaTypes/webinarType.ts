import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const webinarType = defineType({
    name: 'webinar',
    title: 'Webinar',
    type: 'document',
    icon: PlayIcon,
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
            title: 'Webinar URL',
            type: 'url',
            description: 'The URL of the webinar (e.g., YouTube, Vimeo, Zoom recording)',
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
            media: 'thumbnail',
        },
        prepare(selection) {
            const { title, media } = selection
            return {
                title: title || 'Untitled Webinar',
                media: media
            }
        }
    },
})
