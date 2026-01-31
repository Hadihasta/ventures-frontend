import { FileText } from 'lucide-react'

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="group bg-white p-6 rounded-3xl border border-blue-100 shadow-md hover:-translate-y-3 hover:shadow-2xl transition-all">
      <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-4">
        <FileText className="text-teal-600" />
      </div>

      <h2 className="text-xl font-semibold text-blue-700 mb-2">
        #{post.id} {post.title}
      </h2>

      <p className="text-gray-500 ">
        {post.body}
      </p>
    </div>
  )
}
