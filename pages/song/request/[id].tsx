import styles from '@/styles/songs/RequestLesson.module.scss';
import PageNav from "@/components/common/layout/PageHeader";
import PageRoot from "@/components/common/layout/PageRoot";
import { GetServerSideProps, NextPage } from "next";
import PageContent from '@/components/common/layout/PageContent';
import { Dropdown, SSRProvider } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import HorizontalSlider from '@/components/common/HorizontalSlider';
import Button from '@/components/common/Button';
import TeacherBoxContainer from '@/containers/TeacherBoxContainer';
import TextToggleButton from '@/components/common/TextToggleButton';

interface Props {
  song: string;
}

const RequestLesson: NextPage<Props> = ({ song }) => {
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

          <TextToggleButton 
            className={styles.face}
            leftText={'비대면'}
            rightText={'동네'}
          />

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
                <TeacherBoxContainer
                  key={k}
                  className={styles.teacher}
                  onClick={clickTeacher}
                />
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

export default RequestLesson;