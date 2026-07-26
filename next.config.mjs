/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        // Team photos uploaded through /admin are served by the auth service.
        // `unoptimized: true` above means next/image doesn't enforce this
        // today, but the entry has to be here if that ever flips.
        protocol: "https",
        hostname: "auth.gdgbabcock.com",
      },
    ],
  },
  // Tailwind's own Lightning CSS optimize pass is disabled in
  // postcss.config.mjs (it has a rule-dedup bug that silently drops
  // near-duplicate declaration blocks), which leaves Tailwind's raw,
  // CSS-nesting-heavy output unflattened. Webpack's separate CSS minimizer
  // (cssnano-simple) can't parse that syntax and crashes the build, so it
  // has to be skipped too — final CSS ships unminified for this project.
  webpack(config) {
    config.optimization.minimizer = config.optimization.minimizer?.filter(
      (fn) => !fn.toString().includes("css-minimizer-plugin")
    );
    return config;
  },
}

export default nextConfig
