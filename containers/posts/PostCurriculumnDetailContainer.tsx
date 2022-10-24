import PostCurriculumDetail from '@/components/posts/PostCurriculumDetail';

export default function PostCurriculumnDetailContainer() {
  const props = {
    data: [
      {title: '헤이즈 - 헤픈우연', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
      {title: '캐논 변주곡', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
      {title: 'Falling Slowly', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
      {title: 'Piano Practice Piece', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
    ]
  }

  return <PostCurriculumDetail {...props} />;
}