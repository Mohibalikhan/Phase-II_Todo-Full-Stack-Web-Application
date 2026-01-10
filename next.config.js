/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // agar kuch experimental features use kar rahe ho to rakho, warna empty bhi theek
  },
  images: {
    domains: ['localhost:8000', 'your-backend-domain.vercel.app'], // http:// hata diya, domains mein sirf host likhte hain
    // Production mein actual domain add kar do, jaise 'todoapp-backend.vercel.app'
  },
  // env block hata diya — ab warning nahi aayegi!
}

module.exports = nextConfig