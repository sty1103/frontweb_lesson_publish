import PostArticleDetail from "@/components/item/post/PostArticleDetail";
import PostCurriculumDetail from "@/components/item/post/PostCurriculumDetail";
import PostPracticeDetail from "@/components/item/post/PostPracticeDetail";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  type: string;
  id: string;
}

const PostDetail: NextPage<Props> = ({ type }) => {
  switch( type ) {
    case 'practice':
      return <PostPracticeDetail />;
    case 'article':
      return <PostArticleDetail />;
    default:
      return <PostCurriculumDetail />;
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 글 데이터 조회
  // const data = async fetch()
  // console.log( context );
  const props = {
    id: context.query.id,
    type: context.query.type
  }

  return {
    props
  }
};

export default PostDetail;