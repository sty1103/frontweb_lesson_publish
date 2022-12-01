import styles from '@/styles/posts/PostPage.module.scss';
import Button from "@/components/common/Button";
import PostsContainer from "@/containers/posts/PostsContainer";
import { moveUrl } from "@/lib/utils";
import { NextPage } from "next";
import { IoMdMusicalNote } from "react-icons/io";
import PageRoot from '@/components/common/layout/PageRoot';
import PageContent from '@/components/common/layout/PageContent';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import UploadPopup from '@/components/popups/UploadPopup';
import { useState } from 'react';

const PostPage: NextPage = () => {
  const user = useRecoilValue(userAtom);
  const [uploadPopup, setUploadPopup] = useState<boolean>(false);

  return (
    <PageRoot className={styles.root}>
      <PageContent className={styles.content}>
        <PostsContainer showTitle={false} />

        { user?.type!==1 &&
          <Button className={styles.upload} onClick={() => moveUrl('/post/upload')}>
            <IoMdMusicalNote /> 게시글 업로드
          </Button>
        }

        { user?.type===1 && 
          <Button className={styles.upload} onClick={() => setUploadPopup(true)}>
            <IoMdMusicalNote /> 곡·게시글 업로드
          </Button>
        }
        
        <UploadPopup show={uploadPopup} onClose={() => setUploadPopup(false)} />
      </PageContent>
    </PageRoot>
  );
}

export default PostPage;