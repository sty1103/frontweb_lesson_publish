import Posts from '@/components/posts/Posts'

export default function PostsContainer() {
  const props = {
    data: [
      { type: 'practice' },
      { type: 'article' },
      { type: 'curriculum' },
      { type: 'teacher' }
    ]
  }

  return <Posts {...props} />;
}