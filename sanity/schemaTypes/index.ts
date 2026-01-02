import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {blogType} from './blogType'
import {authorType} from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blogType, authorType],
}
