import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'u9vbpezv',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
});

async function checkData() {
    console.log('--- Checking Testimonials ---');
    try {
        const testimonials = await client.fetch(`*[_type == "testimonial"] {
            "quote": content,
            "author": name,
            role,
            rating,
            "color": select(rating >= 5 => "primary", "accent"),
            "avatar": avatar.asset->url
        }`);
        console.log('Testimonials found:', testimonials.length);
        console.log(JSON.stringify(testimonials, null, 2));
    } catch (e) {
        console.error('Error fetching testimonials:', e.message);
    }

    console.log('\n--- Checking Hero ---');
    try {
        const hero = await client.fetch(`*[_type == "hero"][0]`);
        console.log('Hero:', hero ? 'Found' : 'Not found');
    } catch (e) {
        console.error('Error fetching hero:', e.message);
    }
}

checkData().catch(console.error);
