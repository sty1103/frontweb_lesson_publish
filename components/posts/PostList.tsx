import dynamic from 'next/dynamic';
import styles from '@/styles/posts/PostList.module.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import PostPracticeContainer from 'containers/posts/PostPracticeContainer';
import React, { useRef, useState } from 'react';
import { SSRProvider } from 'react-bootstrap';
import PostArticleContainer from '@/containers/posts/PostArticleContainer';
import PostCurriculumContainer from '@/containers/posts/PostCurriculumContainer';
import PostTeacherContainer from '@/containers/posts/PostTeacherContainer';
import HorizontalSlider from '../common/HorizontalSlider';

interface Data {
  type: string;
}

interface Props {
  data: Data[];
}

// 나중에 const로 변경
// const filter_inst = {
let filterInstList: any = { all:'전체악기', piano:'피아노', guitar:'기타', drum:'드럼', violin:'바이올린', ukulele:'우쿨렐레', saxophone:'섹소폰', hamonikr:'하모니카' }
const filterOrderList: any = { popular:'인기순', recent:'최신순' };
const filterPostList: any = { all:'전체보기', practice:'게시물', article:'아티클', curriculum:'커리큘럼', teacher:'선생님' };

export default function PostList({ data }: Props) {
  // 임시 데이터 삽입
  for( let i=1; i<=30; i++ ) {
    filterInstList[`etc${i}`] = '피아노';
  }

  // 악기 필터 드래그 이벤트에 사용
  const [ clientX, setClientX ] = useState<number>(0);

  // 필터 상태
  const [ filterOrder, setFilterOrder ] = useState<string>(Object.keys(filterOrderList)[0]);
  const [ filterPost, setFilterPost ] = useState<string>('all');
  const [ filterInst, setFilterInst ] = useState<string>('all');

  return (
    <section className={styles.postlist}>
      <div className={styles.title}>
        <div>practice post</div>

        <SSRProvider>
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle>
              <span>{filterOrderList[filterOrder]}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(filterOrderList).map((k) => {
                return (
                  <Dropdown.Item
                    key={k}
                    onClick={(e)=>clickFilterOrder(e, k)}
                  >
                    {filterOrderList[k]}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle>
              <span>{filterPostList[filterPost]}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(filterPostList).map((k) => {
                return (
                  <Dropdown.Item
                    key={k}
                    onClick={(e)=>clickFilterPost(e, k)}
                  >
                    {filterPostList[k]}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
        </SSRProvider>
      </div>

      <HorizontalSlider
        className={styles.filters}
        clientX={clientX}
        setClientX={setClientX}
      >
        {Object.keys(filterInstList).map((k) => {
          return (
            <div
              key={k}
              className={filterInst==k ? styles.active:''}
              onClick={(e)=>clickFilterInst(e, k)}
            >
              {filterInstList[k]}
            </div>
          )
        })}
      </HorizontalSlider>

      <div className={styles.items}>
        <PostPracticeContainer />
        <PostArticleContainer />
        <PostCurriculumContainer />
        <PostTeacherContainer />
      </div>
    </section>
  )

  function clickFilterInst(e: React.MouseEvent, key: string) {
    setFilterInst(key);
  }

  function clickFilterOrder(e: React.MouseEvent, key: string) {
    setFilterOrder(key);
  }

  function clickFilterPost(e: React.MouseEvent, key: string) {
    setFilterPost(key);
  }
}