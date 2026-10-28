export type Category = 'Question' | 'Help' | 'Rent' | 'Sell'

export const CATEGORIES: Category[] = ['Question', 'Help', 'Rent', 'Sell']

export interface Post {
  id: number
  userId: number
  authorName: string
  title: string
  content: string
  category: Category
  isClosed: boolean
  createdAt: string
}

// What the Create post form sends. The server adds id, author and date.
export type NewPost = Pick<Post, 'title' | 'content' | 'category'>

export interface PostComment {
  id: number
  postId: number
  userId: number
  authorName: string
  content: string
}

export interface User {
  id: number
  name: string
}

export type Role = 'member' | 'moderator'

// A report points at a post OR a comment, so it has two nullable foreign keys.
export interface Report {
  id: number
  reporterId: number
  reason: string
  postId: number | null
  commentId: number | null
  status: 'pending' | 'resolved' | 'dismissed'
  createdAt: string
}

// A pin links a user to a post they chose to show at the top of their profile.
export interface Pin {
  id: number
  userId: number
  postId: number
}
