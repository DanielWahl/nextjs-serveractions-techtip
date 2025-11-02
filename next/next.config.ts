import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		dangerouslyAllowLocalIP: true,
		remotePatterns: [new URL("http://localhost:1337/uploads/**")],
	},
};

export default nextConfig;
