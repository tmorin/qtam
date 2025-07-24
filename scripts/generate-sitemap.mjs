import {SitemapStream, streamToPromise} from 'sitemap';
import {createWriteStream} from 'fs';
import {globby} from 'globby';

const pages = await globby([
    'src/**/*.html',
    '!src/**/_*.html',
]);

const sitemap = new SitemapStream({hostname: 'https://qtam.morin.io'});
const writeStream = createWriteStream('./src/sitemap.xml');

sitemap.pipe(writeStream);

sitemap.write({url: "/"});

for (const page of pages) {
    const url = page
        .replace(/^src/, '')
    sitemap.write({url});
}

sitemap.end();
await streamToPromise(sitemap);

console.log('✅ Sitemap generated!');
