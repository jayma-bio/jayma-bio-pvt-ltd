/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
        {
          protocol: "https",
          hostname: "utfs.io",
        },
      ],
    },
    reactStrictMode: false,
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  };

export default nextConfig;
