/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://docs.worktreewise.com', // your website URL
    generateRobotsTxt: true, // generate robots.txt
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    outDir: "./public",
};
