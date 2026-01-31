import PostCard from './PostCard'
import PostSkeleton from './PostSkeleton'

type Post = {
  id: number
  title: string
  body: string
}

export default function PostList({
  posts,
  loading,
}: {
  posts: Post[]
  loading: boolean
}) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)
        : posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  )
}
