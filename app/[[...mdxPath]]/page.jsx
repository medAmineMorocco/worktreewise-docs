import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
    const params = await props.params
    const mdxPath = params.mdxPath || []
    const { metadata } = await importPage(mdxPath)

    const siteUrl = 'https://docs.worktreewise.com'
    const canonicalPath = mdxPath.length > 0 ? `/${mdxPath.join('/')}` : '/'
    const canonicalUrl = `${siteUrl}${canonicalPath}`

    return {
        ...metadata,
        alternates: {
            canonical: canonicalUrl,
            ...(metadata?.alternates || {}),
        },
    }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
    const params = await props.params
    const mdxPath = params.mdxPath || []
    const result = await importPage(mdxPath)
    const { default: MDXContent, toc, metadata } = result
    return (
        <Wrapper toc={toc} metadata={metadata}>
            <MDXContent {...props} params={params} />
        </Wrapper>
    )
}