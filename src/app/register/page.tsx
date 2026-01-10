'use client'

import RegisterForm from '../../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 ">
      <div className="w-full max-w-md">
        <div className="relative bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50">
          {/* Subtle gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-600/10 dark:to-pink-600/10" />

          <div className="relative p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-lg shadow-indigo-500/20">
                <span className="text-3xl font-black text-white">T</span>
              </div>
              
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent tracking-tight">
                Join TodoApp
              </h1>
              
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
                Start organizing your life with powerful, beautiful tools.
              </p>
            </div>

            {/* Form */}
            <div className="mt-8">
              <RegisterForm />
            </div>

            {/* Bottom hint */}
            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Optional floating decorative element */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-300/20 dark:bg-indigo-700/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-300/20 dark:bg-purple-700/10 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  )
}