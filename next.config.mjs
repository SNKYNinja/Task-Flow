/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Depreciated
        // domains: ["localhost", "https://img.clerk.com", "img.clerk.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "https://img.clerk.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
