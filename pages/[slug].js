import Head from 'next/head';
import { useRouter } from 'next/router'
import cheerio from 'cheerio';
import fetch from 'node-fetch';

export default function Page({ data }) {
    const router = useRouter()

    // Make sure we're in the browser
    if (typeof window !== 'undefined') {
        router.push(data.url);
    }
    
    return (
        <Head>
            <meta property="og:image" content={data.image} />
            <meta property="og:title" content={data.title} />
            <meta property="og:url" content={data.url} />
            <meta property="og:description" content={data.description} />
        </Head>
    )
}

export async function getServerSideProps({ params }) {
    const slug = params.slug;

    const response = await fetch(`https://medsvit.org/${slug}`)

    const body = await response.text();

    const $ = cheerio.load(body);

    const metaTags = {
        "title": $('meta[property="og:title"]').attr('content'),
        "description": $('meta[property="og:description"]').attr('content'),
        "image": $('meta[property="og:image"]').attr('content'),
        "url": $('meta[property="og:url"]').attr('content'),
    }
    
    const data = metaTags;

    return {
      props: {
        data,
      },
    }
}
