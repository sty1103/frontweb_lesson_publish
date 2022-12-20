import styles from './PostList.module.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import { SSRProvider } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import TextToggleButton from '@/components/button/toggle/TextToggleButton';
import PageContent from '@/components/layout/page/PageContent';
import HorizontalSlider from '@/components/contents/HorizontalSlider';
import PracticeItem from '@/components/item/post/PracticeItem';
import CurriculumItem from '@/components/item/post/CurriculumItem';
import ArticleItem from '@/components/item/post/ArticleItem';
import TeachePostItem from '@/components/item/post/TeacherPostItem';

export interface Props {
  className?: string
  showFilterOrder?: boolean;
  showFilterPost?: boolean;
  showFilterInstrument?: boolean
  showTitle?: boolean;
  showLocationToggle?: boolean;
}

export default function PostList({ className, showFilterOrder=true, showFilterPost=true, showFilterInstrument=true, showTitle=true, showLocationToggle=true }: Props) {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
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
    <section className={`${styles.root} ${className}`}>
      <div className={styles.title}>
        <div className={styles.text}>
          { showTitle && 
            <div>
              { user?.type===0 ? 'practice post':'lesson matching' }
            </div>
          }

          { (user?.type===1 && showLocationToggle) && 
            <TextToggleButton className={styles.toggle} leftText='비대면' rightText='동네' />
          }
        </div>
        
        <div className={styles.filters}>
          <SSRProvider>
            { showFilterOrder && 
              <Dropdown className={`${styles.dropdown} ${styles.order}`}>
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
            }
            
            { showFilterPost && 
              <Dropdown className={`${styles.dropdown} ${styles.post}`}>
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
            }
          </SSRProvider>
        </div>
      </div>

      { showFilterInstrument && 
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
      }

      <PageContent className={styles.content}>
        <PracticeItem />
        <ArticleItem />
        { user?.type===0 && 
          <>
            <CurriculumItem />
            <TeachePostItem />
          </>
        }

        { user?.type===1 && 
          <PracticeItem />
        }
      </PageContent>
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