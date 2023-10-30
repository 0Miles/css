import Layout from '~/layouts/reference'
import metadata from './metadata'
/* @ts-expect-error toc */
import Content, { toc } from './content.mdx'
import { generate } from '~/utils/metadata'

export async function generateMetadata(props: any, parent: any) {
    return generate(metadata, props, parent)
}

export default async function Page(props: any) {
    return <Content />
}