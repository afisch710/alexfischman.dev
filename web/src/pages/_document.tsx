// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Only include truly global static meta tags here */}
                    <link rel="icon" href="/af.ico" />
                    <meta name="description" content="Alex Fischman's developer portfolio" />
                    {/* You could include some generic Twitter meta tags if you wish */}
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;