import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const videoType = defineType({
    name: 'video',
    title: 'Video',
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
            title: 'Video URL',
            type: 'url',
            description: 'The URL of the video (e.g., YouTube, Vimeo)',
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
            title: 'title.en',
            media: 'thumbnail',
        },
        prepare(selection) {
            const { title, media } = selection
            return {
                title: title || 'Untitled Video',
                media: media
            }
        }
    },
})
