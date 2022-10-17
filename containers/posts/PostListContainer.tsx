import PostList from '@/components/posts/PostList'

export default function PostListContainer() {
  const props = {
    data: [
      { type: 'practice' },
      { type: 'article' },
      { type: 'curriculum' },
      { type: 'teacher' }
    ]
  }

  return <PostList {...props} />;
}