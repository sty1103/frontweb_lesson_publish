import DashboardContainer from '@/containers/DashboardContainer';
import SongContainer, { IData } from '@/containers/songs/SongContainer';
import { moveUrl } from '@/lib/utils';
import { userAtom } from '@/store/common';
import styles from '@/styles/profile/ProfileLessons.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { Dropdown, SSRProvider } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

interface Props {
  className?: string;
  songData: IData[];
}

export default function MyPageLessons({ className, songData }: Props) {
  const user = useRecoilValue(userAtom);
  const filterOrderList: any = {
    all: { name: '전체' },
    request: { name: '레슨 신청' },
    progress:{ name: '레슨 중' },
    complete: { name: '레슨 완료' }
  };
  const [ filterOrder, setFilterOrder ] = useState<string>(Object.keys(filterOrderList)[0]);

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
                <div className={styles.item} key={k}>
                  <SongContainer
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
          <DashboardContainer />
        }
      </div>
    </div>
  )

  function clickFilterOrder(e: React.MouseEvent, key: string) {
    setFilterOrder(key);
  }
}