/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Lightning CSS's optimize pass (on by default in production via
    // NODE_ENV) has a rule-merging/dedup bug that silently drops
    // near-duplicate declaration blocks — confirmed by diffing dev vs prod
    // CSS output for our .text-outline-* rules, which vanished under
    // optimize even with minify disabled. Skip the pass entirely.
    '@tailwindcss/postcss': { optimize: false },
  },
}

export default config
