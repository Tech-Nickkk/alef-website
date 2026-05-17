import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const eventType = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    icon: CalendarIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Event Name',
            type: 'string',
            description: 'The name of the event (Internal use only - for managing the event on the dashboard).',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Event Slug',
            type: 'slug',
            description: 'The unique identifier for the event. MUST match the hardcoded event ID in the frontend (e.g., gathering-for-a-new-lebanon).',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'eventDate',
            title: 'Event Date',
            type: 'date',
            description: 'Used to automatically place the event in the Upcoming or Past tabs.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'isArchived',
            title: 'Archive Event',
            type: 'boolean',
            description: 'Turn this ON to hide the event from the website (Acts as an archive).',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'eventDate',
        },
        prepare(selection) {
            const { title, subtitle } = selection
            return {
                title: title,
                subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No date set'
            }
        }
    },
})
