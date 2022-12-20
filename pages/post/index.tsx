import styles from './index.module.scss';
import { NextPage } from "next";
import { IoMdMusicalNote } from "react-icons/io";
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import { useState } from 'react';
import PageRoot from '@/components/layout/page/PageRoot';
import PageContent from '@/components/layout/page/PageContent';
import PostList from '@/components/list/PostList';
import Button from '@/components/button/Button';
import UploadPopup from '@/components/popup/topNavBar/UploadPopup';
import { moveUrl } from '@/utils/common';

const PostPage: NextPage = () => {
  const user = useRecoilValue(userAtom);
  const [uploadPopup, setUploadPopup] = useState<boolean>(false);

  return (
    <PageRoot className={styles.root}>
      <PageContent className={styles.content}>
        <PostList showTitle={false} />

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