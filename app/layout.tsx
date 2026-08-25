import {Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './styles.css'
import Script from "next/script";
import {DocsLayout} from "../components/docs-layout";

export const metadata = {
    title: {
        template: '%s - WorktreeWise Docs',
        default: 'WorktreeWise Documentation',
    },
    description: 'Documentation and guides for WorktreeWise, the Git worktree management desktop tool.',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
    const pageMap = await getPageMap();

    return (
        <html
            lang="en"
            dir="ltr"
            suppressHydrationWarning
        >
        <Head>
            <link rel="shortcut icon" href="/images/general/icon.svg"/>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <link rel="icon" href="/icon.svg" type="image/svg+xml"/>
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
            <link rel="manifest" href="/manifest.webmanifest"/>
            <Script id="hotjar-script" strategy="afterInteractive">
                {`(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6540379,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
            </Script>
            <Script
                id="ms-clarity"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vvum1adgvo");
          `,
                }}
            />
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-Y1EESLCDEJ"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y1EESLCDEJ');
          `}
            </Script>
        </Head>
        <body>
        <DocsLayout pageMap={pageMap}>
            {children}
        </DocsLayout>
        </body>
        </html>
    )
}