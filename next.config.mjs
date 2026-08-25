import nextra from "nextra";

const withNextra = nextra({
    search: true,
    defaultShowCopyCode: true,
});

export default withNextra({
    async redirects() {
        return [
            {
                source: '/latest',
                destination: '/',
                permanent: true,
            },
            {
                source: '/latest/:path*',
                destination: '/:path*',
                permanent: true,
            },
            {
                source: '/1.0',
                destination: '/',
                permanent: true,
            },
            {
                source: '/1.0/:path*',
                destination: '/:path*',
                permanent: true,
            },
        ];
    },
});
