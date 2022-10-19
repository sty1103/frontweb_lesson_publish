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

export default function PostList({ data }: Props) {
  // 나중에 const로 변경
  // const filter_inst = {
  let filterInstList: any = {
    all: { name: '전체악기' },
    piano: { name: '피아노' },
    guitar: { name: '기타' },
    drum: { name: '드럼' },
    violin: { name: '바이올린' },
    ukulele: { name: '우쿨렐레' },
    saxophone: { name: '섹소폰' },
    hamonikr: { name: '하모니카'}
  }
  const filterOrderList: any = {
    popular: { name: '인기순' },
    recent:{ name: '최신순' } 
  };
  const filterPostList: any = {
    all: { name: '전체보기' },
    practice: { name: '게시물' },
    article: { name: '아티클' },
    curriculum: { name: '커리큘럼' },
    teacher: { name: '선생님' }
  };

  // 임시 데이터 삽입
  for( let i=1; i<=30; i++ ) {
    filterInstList[`etc${i}`] = { name: '피아노' };
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
              <span>{filterOrderList[filterOrder].name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(filterOrderList).map((k) => {
                return (
                  <Dropdown.Item
                    key={k}
                    onClick={(e)=>clickFilterOrder(e, k)}
                  >
                    {filterOrderList[k].name}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle>
              <span>{filterPostList[filterPost].name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(filterPostList).map((k) => {
                return (
                  <Dropdown.Item
                    key={k}
                    onClick={(e)=>clickFilterPost(e, k)}
                  >
                    {filterPostList[k].name}
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
        {Object.keys(filterInstList).map((v) => {
          return (
            <div
              key={v}
              className={filterInst==v ? styles.active:''}
              onClick={(e)=>clickFilterInst(e, v)}
            >
              {filterInstList[v].name}
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