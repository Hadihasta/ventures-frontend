import { MessageCircle } from 'lucide-react'
import CommentSkeleton from './CommentSkeleton'
import type { Comment } from '@/app/post/page'

export default function CommentList({
  postId,
  comments,
  loading,
}: {
  postId: string
  comments: Comment[]
  loading: boolean
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-md">
      <h2 className="text-xl font-semibold text-teal-700 mb-4 flex items-center gap-2">
        <MessageCircle size={20} /> Comments for Post #{postId}
      </h2>

      {loading ? (
        <CommentSkeleton />
      ) : comments.length === 0 ? (
        <p className="text-gray-400">No comments found.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="p-4 rounded-xl bg-gray-50 border">
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-500">{c.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
