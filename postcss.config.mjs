import postcssImport from 'postcss-import';

export default {
    // The Astro Tailwind integration adds nesting and Tailwind after imports.
    plugins: [postcssImport()],
};
