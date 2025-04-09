import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'

export const Insight = defineDocumentType(() => ({
  name: 'Insight',
  filePathPattern: `insights/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath, // e.g. "my-first-insight"
    },
  },
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Insight],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default contentLayerConfig
