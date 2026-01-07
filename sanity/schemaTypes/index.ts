import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { blogType } from './blogType'
import { authorType } from './authorType'
import { videoType } from './videoType'
import { shortType } from './shortType'
import { podcastType } from './podcastType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blogType, authorType, videoType, shortType, podcastType],
}
