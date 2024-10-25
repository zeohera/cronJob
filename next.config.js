/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: true,
	distDir: 'build',
	assetPrefix: process.env.NODE_ENV === 'production' ? '.' : undefined,
	images: {
		unoptimized: true,
	},
	// Configure SVGR
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg')
		)
		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ['@svgr/webpack'],
			}
		)
		fileLoaderRule.exclude = /\.svg$/i
		return config
	},
}

export default nextConfig
