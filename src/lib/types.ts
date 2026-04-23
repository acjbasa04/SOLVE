export type Profile = {
  id: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  full_name: string | null
  updated_at: string
}

export type Article = {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  featured_image: string | null
  status: 'Draft' | 'Published'
  published_at: string | null
  created_at: string
  updated_at: string
}

export type Event = {
  id: string
  title: string
  description: string | null
  event_date: string | null
  location: string | null
  featured_image: string | null
  created_at: string
}

export type EventImage = {
  id: string
  event_id: string
  url: string
  caption: string | null
  display_order: number
  created_at: string
}

export type Resource = {
  id: string
  title: string
  description: string | null
  file_url: string
  category: string | null
  created_at: string
}

export type TeamMember = {
  id: string
  name: string
  role: string | null
  bio: string | null
  image_url: string | null
  display_order: number
  created_at: string
}

export type Submission = {
  id: string
  form_type: string
  payload: any
  status: string
  created_at: string
}
