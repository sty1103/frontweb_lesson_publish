import styles from '@/styles/profile/Profile.module.scss';
import PageRoot from "@/components/common/layout/PageRoot";
import { GetServerSideProps, NextPage } from "next";
import PageContent from '@/components/common/layout/PageContent';
import { MdArrowForwardIos } from 'react-icons/md';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Button from '@/components/common/Button';
import React, { useState } from 'react';
import PostsContainer from '@/containers/posts/PostsContainer';
import MyPageLikesContainer from '@/containers/profile/ProfileLikesContainer';
import { IData } from '@/containers/songs/SongContainer';
import MyPageLessonsContainer from '@/containers/profile/ProfileLessonsContainer';
import MyPageReviewsContainer from '@/containers/profile/ProfileReviewsContainer';
import { moveUrl } from '@/lib/utils';

interface Props {
  id: string;
}

const Profile: NextPage<Props> = ({ id }) => {
  const subMenuData: any = {
    posts: '게시글',
    likes: '좋아요',
    // playings: '연주',
    lessons:  '레슨',
    reviews: '리뷰',
    // requests: '레슨신청'
  }

  const [ subMenu, setSubMenu ] = useState<string>('posts');

  const songData: IData[] = [ ...Array(12) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  const MyPageLikes = dynamic(() => import('@/containers/profile/ProfileLikesContainer'));
  const MyPageLessons = dynamic(() => import('@/containers/profile/ProfileLessonsContainer'));
  const MyPageReviews = dynamic(() => import('@/containers/profile/ProfileReviewsContainer'));

  return (
    <PageRoot className={styles.root}>
      {/* <PageNav className={styles.nav}>
        프로필
      </PageNav> */}
      <PageContent className={styles.content}>
        <div className={styles.profile}>
          <span onClick={() => moveUrl('/profile/update')}>
            내 프로필 수정 <MdArrowForwardIos />
          </span>
        </div>
        <div className={styles.info}>
          <div className={styles.img}>
            {/* <Image /> */}
          </div>
          <div className={styles.basic}>
            <div className={styles.top}>
              방구석 뮤지션
            </div>
            <div className={styles.middle}>
              3년 미만 중급자
            </div>
            <div className={styles.bottom}>
              <span>피아노</span>
              <span>기타</span>
              <span>드럼</span>
              <span>바이올린</span>
            </div>
          </div>
          <div className={styles.settings}>
            <div className={styles.top}>
              설정
            </div>
            <div className={styles.middle}>
              고객센터 <MdArrowForwardIos />
            </div>
            <div className={styles.bottom}>
              <span>회원탈퇴</span>
              <Button onClick={()=>{}}>
                로그아웃
              </Button>
            </div>
          </div>
        </div>

        <nav className={styles.submenu}>
          <ul>
            {Object.keys(subMenuData).map((v)=>{
              return (
                <li
                  className={v===subMenu ? styles.active:''}
                  onClick={e => clickSubMenu(e,v)}
                  key={v}
                >
                  {subMenuData[v]}
                </li>
              )
            })}
          </ul>
        </nav>
        
        { subMenu==='posts' &&
          <PostsContainer className={styles.posts} showFilterPost={false} showTitle={false} />
        }

        <div className={styles.content}>
          { subMenu==='likes' &&
            <MyPageLikes />
          }

          {/* { subMenu==='playings' &&
            <SongsContainer className={styles.songs} data={songData} />
          } */}

          { subMenu==='lessons' &&
            <MyPageLessons songData={songData} />
          }

          {/* { subMenu==='requests' &&
            <MyPageRequestsContainer data={songData} />
          } */}

          { subMenu==='reviews' &&
            <MyPageReviews />
          }
        </div>
      </PageContent>
    </PageRoot>
  )

  function clickSubMenu(e: React.MouseEvent, key: string) {
    setSubMenu(key);
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = {
    id: context.query.id
  }

  return {
    props
  }
};

export default Profile;