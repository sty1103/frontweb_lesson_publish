import styles from '@/styles/profile/Profile.module.scss';
import PageRoot from "@/components/common/layout/PageRoot";
import { GetServerSideProps, NextPage } from "next";
import PageContent from '@/components/common/layout/PageContent';
import { MdArrowForwardIos, MdLocationPin } from 'react-icons/md';
import Image from 'next/image';
import Button from '@/components/common/Button';
import React, { useState } from 'react';
import PostsContainer from '@/containers/posts/PostsContainer';
import MyPageLikesContainer from '@/containers/profile/ProfileLikesContainer';
import { IData } from '@/containers/songs/SongContainer';
import MyPageLessonsContainer from '@/containers/profile/ProfileLessonsContainer';
import MyPageReviewsContainer from '@/containers/profile/ProfileReviewsContainer';
import { moveUrl } from '@/lib/utils';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineHeart } from 'react-icons/ai';
import router from 'next/router';

interface Props {
  id: string;
}

const Profile: NextPage<Props> = ({ id }) => {
// const Profile: NextPage = () => {
  const user = useRecoilValue(userAtom);
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

  return (
    <PageRoot className={styles.root}>
      <PageContent className={styles.content}>
        { user?.type===0 &&
          <div className={styles['profile--student']}>
            <div className={styles['profile']}>
              <span onClick={() => moveUrl('/profile/update')}>
                내 프로필 수정 <MdArrowForwardIos />
              </span>
            </div>
            <div className={styles.info}>
              <div className={styles.img}>
                {/* <Image /> */}
              </div>
              <div className={styles.detail}>
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
          </div>
        }

        { user?.type===1 &&
          <div className={styles['profile--teacher']}>
            <div className={styles.banner}>
              <Image
                src='/images/profile_background.jpeg'
                alt=''
                layout='fill'
                objectFit='cover'
              />
              <div className={styles.container}>
                <div className={styles.header}>
                  <AiOutlineArrowLeft onClick={()=>router.back()} />

                  <div className={styles.wrapper}>
                    <AiOutlineHeart />
                    300
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.info}>
              <div className={styles.img}>
                {/* <Image /> */}
              </div>

              <div className={styles.name} onClick={() => moveUrl('/profile/update')}>
                <span>
                  김도우 <MdArrowForwardIos />
                </span>
                <span>
                  <MdLocationPin />
                  1.2km 대치동
                </span>
              </div>
              <div className={styles.detail}>
                <div className={styles.rate}>
                  <AiFillStar /> 3.8
                </div>
                <div className={styles.desc}>
                  안녕하세요! 음악인들을 위한 음악인, 김도우입니다. 현재 음악과외 8년차로 수준에 맞는 수업이 가능합니다!
                </div>
                <div className={styles.instruments}>
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
          </div>
        }
        
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
          <PostsContainer
            className={styles.posts} 
            showFilterPost={false}
            showTitle={false}
            showLocationToggle={user?.type===0}
          />
        }

        <div className={styles.content}>
          { subMenu==='likes' &&
            <MyPageLikesContainer />
          }

          {/* { subMenu==='playings' &&
            <SongsContainer className={styles.songs} data={songData} />
          } */}

          { subMenu==='lessons' &&
            <MyPageLessonsContainer songData={songData} />
          }

          {/* { subMenu==='requests' &&
            <MyPageRequestsContainer data={songData} />
          } */}

          { subMenu==='reviews' &&
            <MyPageReviewsContainer />
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