import { defineField, defineType } from 'sanity'
import { MobileDeviceIcon } from '@sanity/icons'

export const shortType = defineType({
    name: 'short',
    title: 'Short',
    type: 'document',
    icon: MobileDeviceIcon,
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
            title: 'Short Video URL',
            type: 'url',
            description: 'The URL of the short video (e.g., Facebook Reel, Instagram Reel, YouTube Short)',
            validation: (rule) => rule.required(),
        }),
        // --- NEW FIELD ADDED HERE ---
        defineField({
            name: 'thumbnail',
            title: 'Cover Image',
            type: 'image',
            description: 'Upload a cover image for Facebook/Instagram/TikTok videos (Auto-generated for YouTube if left empty)',
            options: {
                hotspot: true,
            },
        }),
        // ---------------------------
        defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
                list: [
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'Instagram', value: 'instagram' },
                    { title: 'YouTube', value: 'youtube' },
                    { title: 'TikTok', value: 'tiktok' },
                    { title: 'Other', value: 'other' },
                ],
            },
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
            subtitle: 'platform',
            media: 'thumbnail' // Update preview to show image
        },
    },
})