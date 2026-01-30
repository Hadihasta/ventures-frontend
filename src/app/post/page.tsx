'use client'

import { useEffect, useState } from 'react'
import { FileText, MessageCircle } from 'lucide-react'

type Post = {
  id: number
  title: string
  body: string
}

type Comment = {
  id: number
  name: string
  body: string
}

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchId, setSearchId] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(setPosts)
  }, [])

  const searchPost = async () => {
    if (!searchId) return
    setLoading(true)

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${searchId}`
    )
    const data = await res.json()
    setComments(data)

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff] px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Post App
        </h1>

        {/* Search */}
        <div className="flex gap-3 mb-10">
          <input
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="Search post by ID (e.g 1)"
            className="flex-1 px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={searchPost}
            className="bg-teal-600 text-white px-6 rounded-xl hover:bg-teal-700 transition"
          >
            Search
          </button>
        </div>

        {/* Posts */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {posts.map(post => (
            <div
              key={post.id}
              className="group relative bg-white p-6 rounded-3xl border border-blue-100 shadow-md hover:-translate-y-3 hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-4">
                <FileText className="text-teal-600" />
              </div>

              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                #{post.id} {post.title}
              </h2>

              <p className="text-gray-500 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                {post.body}
              </p>
            </div>
          ))}
        </div>

        {/* Comments */}
        {searchId && (
          <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-md">
            <h2 className="text-xl font-semibold text-teal-700 mb-4 flex items-center gap-2">
              <MessageCircle size={20} /> Comments for Post #{searchId}
            </h2>

            {loading && <p className="text-gray-400">Loading...</p>}

            <ul className="space-y-4">
              {comments.map(comment => (
                <li
                  key={comment.id}
                  className="p-4 rounded-xl border border-gray-100 bg-gray-50"
                >
                  <p className="font-medium text-gray-700">
                    {comment.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {comment.body}
                  </p>
                </li>
              ))}
            </ul>

            {!loading && comments.length === 0 && (
              <p className="text-gray-400 mt-4">
                No comments found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
