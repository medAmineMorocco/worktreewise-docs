import {Footer, Layout, Navbar} from 'nextra-theme-docs'
import {Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
    // Define your metadata here
    // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const navbar = (
    <Navbar
        logo={<img src="/images/general/logo.svg" alt="Logo" width={240} height={100}/>}
        // ... Your additional navbar options
    />
)
const footer = <Footer>{new Date().getFullYear()} © WorktreeWise.</Footer>

export default async function RootLayout({children}) {
    return (
        <html
            // Not required, but good for SEO
            lang="en"
            // Required to be set
            dir="ltr"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning
        >
        <Head
            // ... Your additional head options
        >
            <link rel="shortcut icon" href="/images/general/icon.svg"/>
            {/* Your additional tags should be passed as `children` of `<Head>` element */}
            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <link rel="icon" href="/icon.svg" type="image/svg+xml"/>
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
            <link rel="manifest" href="/manifest.webmanifest"/>
            <!-- Hotjar Tracking Code for https://docs.worktreewise.com -->
            <script>
                (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6540379,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            </script>
        </Head>
        <body>
        <Layout
            navbar={navbar}
            pageMap={await getPageMap()}
            docsRepositoryBase="https://github.com/phucbm/nextra-docs-starter/tree/main"
            footer={footer}
            editLink={null}
            feedback={{content: null}}
            // ... Your additional layout options
        >
            {children}
        </Layout>
        </body>
        </html>
    )
}