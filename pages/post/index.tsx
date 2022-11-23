import styles from '@/styles/posts/PostPage.module.scss';
import Button from "@/components/common/Button";
import PostsContainer from "@/containers/posts/PostsContainer";
import { moveUrl } from "@/lib/utils";
import { NextPage } from "next";
import { IoMdMusicalNote } from "react-icons/io";
import PageRoot from '@/components/common/layout/PageRoot';
import PageContent from '@/components/common/layout/PageContent';

const PostPage: NextPage = () => {
  return (
    <PageRoot className={styles.root}>
      <PageContent className={styles.content}>
        <PostsContainer showTitle={false} />

        <Button className={styles.upload} onClick={() => moveUrl('/post/upload')}>
          <IoMdMusicalNote /> 게시글 업로드
        </Button>
      </PageContent>
    </PageRoot>
    // <div style={{paddingTop:'100px'}}>
    //   <PostsContainer showTitle={false} />

    //   <Button className={styles.upload} onClick={() => moveUrl('/post/upload')}>
    //     <IoMdMusicalNote /> 게시글 업로드
    //   </Button>
    // </div>
  );
}

export default PostPage;