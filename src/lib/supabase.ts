import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Missing Supabase env vars')
    _client = createClient(url, key)
  }
  return _client
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as any)[prop]
  },
})

// Types matching our database schema
export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  body: string | null
  main_image: string | null
  published_at: string | null
  author_id: string | null
  categories: string[]
  created_at: string
  updated_at: string
}

export type Portfolio = {
  id: string
  title: string
  slug: string
  category: string
  main_image: string | null
  client: string | null
  description: string | null
  published_at: string | null
  gallery: string[]
  video_url: string | null
  has_report: boolean
  report_url: string | null
  report_label: string | null
  created_at: string
  updated_at: string
}

export type Service = {
  id: string
  icon: string | null
  badge: string | null
  order_id: number
  title: string
  description: string | null
  items: string[]
  cta: string | null
  link: string | null
  highlight: boolean
  color: string | null
  extra: string | null
  created_at: string
  updated_at: string
}

export type Testimonial = {
  id: string
  name: string
  role: string | null
  content: string
  avatar: string | null
  rating: number
  created_at: string
  updated_at: string
}

export type FAQ = {
  id: string
  question: string
  answer: string
  order_id: number
  created_at: string
  updated_at: string
}

export type Step = {
  id: string
  order_id: number
  title: string
  subtitle: string | null
  icon: string | null
  content: string | null
  details: string[]
  deliverable: string | null
  created_at: string
  updated_at: string
}

export type Result = {
  id: string
  value: string
  label: string
  description: string | null
  order_id: number
  created_at: string
  updated_at: string
}

export type Hero = {
  id: string
  badge: string | null
  title: string
  subtitle: string | null
  cta1_label: string | null
  cta1_link: string | null
  cta2_label: string | null
  cta2_link: string | null
  created_at: string
  updated_at: string
}

export type Partner = {
  id: string
  name: string
  logo: string | null
  scale: number
  created_at: string
  updated_at: string
}

export type Author = {
  id: string
  name: string
  slug: string
  image: string | null
  bio: string | null
  created_at: string
  updated_at: string
}
