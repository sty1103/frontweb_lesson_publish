import { userAtom } from '@/store/common';
import styles from './LessonList.module.scss';
import Image from "next/legacy/image";
import { useState } from 'react';
import { Dropdown, SSRProvider } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import SongItem, { ISongData } from '@/components/item/song/SongItem';
import { moveUrl } from '@/utils/common';
import TextToggleButton from '@/components/button/toggle/TextToggleButton';

interface Props {
  className?: string;
}

export default function LessonList({ className }: Props) {
  const user = useRecoilValue(userAtom);
  const filterOrderList: any = {
    all: { name: '전체' },
    request: { name: '레슨 신청' },
    progress:{ name: '레슨 중' },
    complete: { name: '레슨 완료' }
  };
  const [ filterOrder, setFilterOrder ] = useState<string>(Object.keys(filterOrderList)[0]);

  const songData: ISongData[] = [ ...Array(12) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.filter}>
        <SSRProvider>
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
        </SSRProvider>
      </div>
      
      <div className={styles.content}>
        { user?.type===0 && 
          <>
            {songData.map((v,k) => {
              return (
                <div className={styles.lesson} key={k}>
                  <SongItem
                    className={styles.song}
                    data={v}
                    onClickSong={() => moveUrl('/lesson/"lessonId"')}
                  />
                  <div className={styles.teacher}>
                    <div className={styles.img}>
                      {/* <Image /> */}
                    </div>
                    <div className={styles.name}>
                      김은수
                    </div>
                    <div className={styles.status}>
                      레슨완료
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        }

        { user?.type===1 && 
          <div className={`${styles.students} ${className}`}>
            <div className={styles.title}>
              레슨 중인 학생
              <TextToggleButton className={styles.toggle} leftText='비대면' rightText='동네' />
            </div>
      
            <div className={styles.content}>
              {[...Array(5)].map((v,k) => {
                return (
                  <div
                    className={styles.student}
                    key={k}
                    onClick={() => moveUrl('/lesson/"lessonId"')}
                  >
                    <div className={styles.left}>
                      <div className={styles.img}>
                      </div>
                      <div className={styles.location}>
                        비대면
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.name}>
                        김은지
                      </div>
                      <div className={styles.song}>
                        베토벤 교향곡 제 1번 C장조 Op.21
                      </div>
                      <div className={styles.period}>
                        <span>레슨기간</span>
                        2022.8.22 ~ 8.31
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        }
      </div>
    </div>
  )

  function clickFilterOrder(e: React.MouseEvent, key: string) {
    setFilterOrder(key);
  }
}