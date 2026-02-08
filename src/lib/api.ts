// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// Helper function to get the auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return null
}

// Generic function for authenticated requests (Todo, Chat)
const makeAuthRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers })
  if (!res.ok) {
    let msg = `HTTP error! status: ${res.status}`
    try {
      const errData = await res.json()
      msg = errData.detail || errData.message || msg
    } catch {}
    throw new Error(msg)
  }
  return res.json()
}

// ---------------- AUTH APIs ---------------- //
export const authAPI = {
  // 🚀 Register
  register: async (email: string, password: string) => {
    console.log('[api.register] Posting to:', `${API_BASE_URL}/api/auth/register`)
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    console.log('[api.register] Response status:', res.status)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('[api.register] Error response:', err)
      throw new Error(err.message || err.detail || `Registration failed (${res.status})`)
    }

    const data = await res.json()
    console.log('[api.register] Success:', { user: data.user })
    return data
  },

  // 🚀 Login
  login: async (email: string, password: string) => {
    console.log('[api.login] Posting to:', `${API_BASE_URL}/api/auth/login`)
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    console.log('[api.login] Response status:', res.status)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('[api.login] Error response:', err)
      throw new Error(err.message || err.detail || `Login failed (${res.status})`)
    }

    const data = await res.json()
    console.log('[api.login] Success:', { user: data.user })
    return data
  },

  // 🚪 Logout
  logout: async () => {
    if (typeof window !== 'undefined') localStorage.removeItem('access_token')
  },
}

// ---------------- TODO APIs ---------------- //
export const todoAPI = {
  getTodos: async () => makeAuthRequest('/api/todos'),
  createTodo: async (
    title: string,
    description?: string,
    due_date?: string,
    due_time?: string,
    priority?: 'low' | 'medium' | 'high',
    recurrence_rule?: 'daily' | 'weekly' | 'monthly' | 'none'
  ) =>
    makeAuthRequest('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title, description, due_date, due_time, priority, recurrence_rule }),
    }),
  getTodo: async (id: string) => makeAuthRequest(`/api/todos/${id}`),
  updateTodo: async (
    id: string,
    updates: {
      title?: string
      description?: string
      completed?: boolean
      due_date?: string
      due_time?: string
      priority?: 'low' | 'medium' | 'high'
      recurrence_rule?: 'daily' | 'weekly' | 'monthly' | 'none'
    }
  ) => makeAuthRequest(`/api/todos/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteTodo: async (id: string) => makeAuthRequest(`/api/todos/${id}`, { method: 'DELETE' }),
}

// ---------------- CHAT APIs ---------------- //
export const chatAPI = {
  sendMessage: async (message: string, conversationId?: string) =>
    makeAuthRequest('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, conversation_id: conversationId }),
    }),
}

// ---------------- CONVENIENCE EXPORTS ---------------- //
export const register = authAPI.register
export const login = authAPI.login
export const logout = authAPI.logout
export const getTodos = todoAPI.getTodos
export const createTodo = todoAPI.createTodo
export const getTodo = todoAPI.getTodo
export const updateTodo = todoAPI.updateTodo
export const deleteTodo = todoAPI.deleteTodo
export const sendMessage = chatAPI.sendMessage
