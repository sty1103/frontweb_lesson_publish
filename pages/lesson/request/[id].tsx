import styles from '@/styles/lesson/LessonRequest.module.scss';
import PageNav from "@/components/common/layout/PageNav";
import PageRoot from "@/components/common/layout/PageRoot";
import { GetServerSideProps, NextPage } from "next";
import PageContent from '@/components/common/layout/PageContent';
import { Dropdown, SSRProvider } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import HorizontalSlider from '@/components/common/HorizontalSlider';
import { AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image';
import { BsCheckLg } from 'react-icons/bs';
import Button from '@/components/common/Button';

interface Props {
  song: string;
}

const LessonRequest: NextPage<Props> = ({ song }) => {
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

  // 임시 데이터 삽입
  for( let i=1; i<=30; i++ ) {
    filterInstList[`etc${i}`] = { name: '피아노' };
  }

  // 악기 필터 드래그 이벤트에 사용
  const [ clientX, setClientX ] = useState<number>(0);

  // 필터 상태
  const [ filterFace, setFilterFace ] = useState<boolean>(false);
  const [ filterOrder, setFilterOrder ] = useState<string>(Object.keys(filterOrderList)[0]);
  const [ filterInst, setFilterInst ] = useState<string>('all');

  const teachersRef = useRef<HTMLDivElement>(null);

  return (
    <PageRoot className={styles.root}>
      <PageNav prevButton={true}>
        레슨 신청하기
      </PageNav>
      <PageContent className={styles.content}>
        <div className={styles.title}>
          <span className={styles.text}>
            선생님을 선택해주세요
          </span>

          <div
            className={`${styles.face} ${filterFace ? styles.active:''}`}
            onClick={clickFilterFace}
          >
            <span>비대면</span>
            <span>동네</span>
          </div>

          <SSRProvider>
            <Dropdown className={`${styles.dropdown}`}>
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
          </SSRProvider>
        </div>

        <HorizontalSlider
          className={styles.instruments}
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

        <div className={styles.teachers} ref={teachersRef}>
          {[...Array(6)].map((v,k) => {
            return (
              <div
                className={`${styles.teacher}`}
                key={k}
                onClick={clickTeacher}
              >
                <div className={styles.top}>
                  <AiOutlineHeart /> 300
                </div>

                <div className={styles.middle}>
                  <div className={styles.img}>
                    {/* <Image /> */}
                    <div className={styles.checked}>
                      <BsCheckLg />
                    </div>
                  </div>
                  <div className={styles.name}>
                    김비단
                  </div>
                  <div className={styles.career}>
                    경력 12년차
                  </div>
                  <div className={styles.instrument}>
                    피아노
                  </div>
                </div>

                <div className={styles.bottom}>
                  <div className={styles.students}>
                    <span>324</span>
                    <span>레슨 학생</span>
                  </div>
                  <div className={styles.rate}>
                    <span>4.5</span>
                    <span>별점(레슨 파워)</span>
                  </div>
                  <div className={styles.lessons}>
                    <span>546</span>
                    <span>레슨 완료</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </PageContent>
      <Button onClick={()=>{}}>
        레슨 신청하기
      </Button>
    </PageRoot>
  )

  function clickFilterFace() {
    setFilterFace(!filterFace);
  }

  function clickFilterOrder(e: React.MouseEvent, key: string) {
    setFilterOrder(key);
  }

  function clickFilterInst(e: React.MouseEvent, key: string) {
    setFilterInst(key);
  }

  function clickTeacher(e: React.MouseEvent) {
    teachersRef.current?.querySelector(`.${styles.active}`)?.classList.remove(styles.active);
    e.currentTarget.classList.add(styles.active);
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = {
    song: context.query.id
  }

  return {
    props
  }
}

export default LessonRequest;