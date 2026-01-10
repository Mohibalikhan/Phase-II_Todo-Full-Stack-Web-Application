// app/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HowItWorks from './components/Howitworks';
import JoinThousands from './components/JoinThousands';
import { Twitter, Instagram, Mail, Github } from 'lucide-react';
import FloatingChatButton from '../components/FloatingChatButton';

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-black dark:to-indigo-950/30">
      {/* Subtle animated background gradient orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-5xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                Master Your Day
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-100">With Clarity</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              The minimalist todo app that helps you focus on what truly matters. Secure, fast, and designed to bring calm to your chaos.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/register"
                className="group relative px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-semibold text-xl text-white shadow-2xl shadow-indigo-600/50 transition-all duration-500 hover:shadow-indigo-600/70 hover:scale-105 hover:-translate-y-1"
              >
                Start Free Today
                <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              <Link
                href="/login"
                className="px-12 py-6 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-300/50 dark:border-white/20 rounded-2xl font-semibold text-xl text-gray-800 dark:text-gray-100 hover:bg-white dark:hover:bg-white/10 hover:border-indigo-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              >
                Sign In
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "🔐", title: "Bank-Level Security", desc: "Your data is encrypted and never shared" },
                { icon: "🚀", title: "Blazing Fast", desc: "Real-time sync across all devices" },
                { icon: "📱", title: "Everywhere You Go", desc: "Seamless on mobile, tablet & desktop" },
                { icon: "🌓", title: "Perfect Dark Mode", desc: "Easy on the eyes, day or night" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12, scale: 1.05 }}
                  className="relative group p-8 rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl dark:hover:shadow-purple-900/50 transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-5 group-hover:scale-110 transition-transform duration-400">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>

        <HowItWorks />
        <JoinThousands />
        <FloatingChatButton />

        {/* Footer */}
        <footer className="py-16 px-8 bg-white/80 dark:bg-black/50 backdrop-blur-2xl border-t border-gray-200/50 dark:border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Logo & Tagline */}
            <div className="text-center md:text-left">
              <Link href="/" className="inline-block mb-5">
                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TodoApp
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto md:mx-0">
                Beautiful task management that brings clarity and calm to your daily life.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Quick Links</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Dashboard
                </Link>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Terms of Service
                </Link>
              </nav>
            </div>

            {/* Social & Copyright */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Connect</h4>
              <div className="flex justify-center md:justify-end gap-8 mb-8">
                <a
                  href="https://github.com/mohibalikhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition transform hover:scale-125"
                >
                  <Github className="w-7 h-7" />
                </a>
                {/* Add more socials later if needed */}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                © {new Date().getFullYear()} TodoApp. Crafted with ❤️ in Pakistan
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}