import styles from '@/styles/mypage/MyPage.module.scss';
import PageNav from "@/components/common/layout/PageNav";
import PageRoot from "@/components/common/layout/PageRoot";
import { NextPage } from "next";
import PageContent from '@/components/common/layout/PageContent';
import { MdArrowForwardIos } from 'react-icons/md';
import Image from 'next/image';
import Button from '@/components/common/Button';
import React, { useState } from 'react';
import PostsContainer from '@/containers/posts/PostsContainer';
import MyPageLikesContainer from '@/containers/mypage/MyPageLikesContainer';
import SongsContainer, { IData } from '@/containers/songs/SongsContainer';
import MyPageLessonsContainer from '@/containers/mypage/MyPageLessonsContainer';
import MyPageRequestsContainer from '@/containers/mypage/MyPageRequestsContainer';
import MyPageReviewsContainer from '@/containers/mypage/MyPageReviewsContainer';
import { moveUrl } from '@/lib/utils';

const MyPage: NextPage = () => {
  const subMenuData: any = {
    posts: '게시글',
    likes: '좋아요',
    reviews: '리뷰',
    playings: '연주중',
    lessons:  '레슨중',
    requests: '레슨신청'
  }

  const [ subMenu, setSubMenu ] = useState<string>('posts');

  const songData: IData[] = [ ...Array(12) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <PageRoot className={styles.root}>
      <PageNav className={styles.nav}>
        마이페이지
      </PageNav>
      <PageContent className={styles.content}>
        <div className={styles.profile}>
          <span onClick={() => moveUrl('/mypage/profile')}>
            내 프로필 정보 <MdArrowForwardIos />
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
          <PostsContainer className={styles.posts} showFilterPost={false} />
        }

        <div className={styles.content}>
          { subMenu==='likes' &&
            <MyPageLikesContainer />
          }

          { subMenu==='reviews' &&
            <MyPageReviewsContainer />
          }

          { subMenu==='playings' &&
            <SongsContainer className={styles.songs} data={songData} />
          }

          { subMenu==='lessons' &&
            <MyPageLessonsContainer data={songData} />
          }

          { subMenu==='requests' &&
            <MyPageRequestsContainer data={songData} />
          }
        </div>
      </PageContent>
    </PageRoot>
  )

  function clickSubMenu(e: React.MouseEvent, key: string) {
    setSubMenu(key);
  }
}

export default MyPage;