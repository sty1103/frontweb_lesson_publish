import PostArticleDetailContainer from "@/containers/posts/PostArticleDetailContainer";
import PostCurriculumnDetailContainer from "@/containers/posts/PostCurriculumnDetailContainer";
import PostPracticeDetailContainer from "@/containers/posts/PostPracticeDetailContainer";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  type: string;
  id: string;
}

const PostDetail: NextPage<Props> = ({ type }) => {
  console.log( type );
  switch( type ) {
    case 'practice':
      return <PostPracticeDetailContainer />;
    case 'article':
      return <PostArticleDetailContainer />;
    default:
      return <PostCurriculumnDetailContainer />;
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