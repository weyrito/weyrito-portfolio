const fs = require('fs')
const path = require('path')

function generateSitemap() {
    const baseUrl = 'https://thomas-fouquet.fr'
    const pages = [
        { url: '', priority: '1.0', changefreq: 'weekly' },
        { url: '/privacy', priority: '0.5', changefreq: 'monthly' }
    ]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}" />
  </url>`).join('\n')}
</urlset>`

    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap)
    console.log('✅ Sitemap generated successfully!')
}

generateSitemap()