'use client'

import { useEffect, useState } from 'react'
import { instance } from '@/lib/axios'
import PostList from '@/components/content/post/PostList'
import CommentList from '@/components/content/post/CommentList'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const DEBOUNCE_DELAY = 500

type Post = {
  id: number
  title: string
  body: string
}

export type Comment = {
  id: number
  name: string
  email: string
  body: string
}

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [searchId, setSearchId] = useState('')
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingComments, setLoadingComments] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  // gunakan local storage post field jika sudah ada
  useEffect(() => {
    const cached = localStorage.getItem('post')

    if (cached) {
      setPosts(JSON.parse(cached))
      setLoadingPosts(false)
      return
    }

    const fetchPosts = async () => {
      try {
        const res = await instance.get('/posts')
        setPosts(res.data)
        localStorage.setItem('post', JSON.stringify(res.data))
      } finally {
        setLoadingPosts(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {

    // if search id tidak ada gunakan local storage data post  full data
    const timeout = setTimeout(async () => {
      if (!searchId) {
        const cached = localStorage.getItem('post')
        if (cached) setPosts(JSON.parse(cached))
        setCurrentPage(1)
        return
      }
        // jika ada yang di cari maka tampilkan comment tidak fetch 
      try {
        setLoadingPosts(true)

        const postRes = await instance.get(`/posts/${searchId}`)
        const post = postRes.data

        setPosts([post])
        setCurrentPage(1)
      } catch {
        setPosts([])
      } finally {
        setLoadingPosts(false)
      }

      try {
        setLoadingComments(true)
        const res = await instance.get(`/comments?postId=${searchId}`)

        const normalized = res.data.map((c: Comment) => ({
          id: c.id,
          body: c.body,
          name: c.name,
          email: c.email,
        }))

        setComments(normalized)
      } finally {
        setLoadingComments(false)
      }
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(timeout)
  }, [searchId])

  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage)

  return (
    <div className="min-h-screen bg-[#f5f9ff] px-6 py-16">
      <div className="max-w-5xl mx-auto">
            <Link
            href="/"
            className="p-2 rounded-xl "
            aria-label="Back"
          >
            <ArrowLeft className="text-blue-600" />
          </Link>

        <h1 className="text-3xl font-bold text-blue-700 mb-6">Post App</h1>

        {/* Search (onChange only) */}
        <div className="mb-10">
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Search post by ID (e.g 1)"
            className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <PostList
          posts={currentPosts}
          loading={loadingPosts}
        />

      {/* PG nation dari data post / post per page*/}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    px-4 py-2 rounded-lg border
                    ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
                    }
                  `}
                >
                  {page}
                </button>
              )
            })}
          </div>
        )}

        {searchId && (
          <CommentList
            postId={searchId}
            comments={comments}
            loading={loadingComments}
          />
        )}
      </div>
    </div>
  )
}
