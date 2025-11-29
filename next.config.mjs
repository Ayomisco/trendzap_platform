/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      'pino': 'pino/package.json',
    },
    excludeRegex: [
      '**/node_modules/thread-stream/test/**',
      '**/node_modules/pino/node_modules/thread-stream/test/**',
      '**/node_modules/@walletconnect/**/thread-stream/test/**',
      '**/node_modules/@reown/**/thread-stream/test/**',
      '.*thread-stream/test/.*',
      '.*pino.*LICENSE.*',
      '.*\\.zip$',
    ],
  },
}

export default nextConfig
