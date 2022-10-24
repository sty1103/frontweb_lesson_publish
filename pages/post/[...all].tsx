import PostArticleDetailContainer from "@/containers/posts/PostArticleDetailContainer";
import PostCurriculumContainer from "@/containers/posts/PostCurriculumContainer";
import PostPracticeDetailContainer from "@/containers/posts/PostPracticeDetailContainer";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  type: string;
  id: string;
}

const PostDetail: NextPage<Props> = ({ type }) => {
  let html = <></>;

  switch( type ) {
    case 'practice':
      html = <PostPracticeDetailContainer />
      break;
    case 'article':
      html = <PostPracticeDetailContainer />
      break;
    case 'curriculum':
      html = <PostCurriculumContainer />
      break;
  }

  return html;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log( context );
  const props = {
    type: 'practice',
    id: '12dd'
  }

  return {
    props
  }
};

export default PostDetail;