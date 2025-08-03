declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  export default function MDXContent(_props: MDXProps): React.ReactElement
  export const frontmatter: Record<string, any>
}
