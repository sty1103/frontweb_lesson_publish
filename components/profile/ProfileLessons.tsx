import SongsContainer, { IData } from '@/containers/songs/SongsContainer';
import { moveUrl } from '@/lib/utils';
import styles from '@/styles/profile/ProfileLessons.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { Dropdown, SSRProvider } from 'react-bootstrap';

interface Props {
  className?: string;
  data: IData[];
}

export default function MyPageLessons({ className, data }: Props) {
  const filterOrderList: any = {
    all: { name: '전체' },
    request: { name: '레슨 신청' },
    progress:{ name: '레슨 중' },
    complete: { name: '레슨 완료' }
  };
  const [ filterOrder, setFilterOrder ] = useState<string>(Object.keys(filterOrderList)[0]);

  console.log( filterOrder );

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
        {data.map((v,k) => {
          const song = [ v ];
          return (
            <div
              className={styles.wrapper}
              onClick={() => moveUrl('/lesson/"lessonId"')}
              key={k}
            >
              <SongsContainer className={styles.song} data={song} />
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
      </div>
    </div>
  )

  function clickFilterOrder(e: React.MouseEvent, key: string) {
    setFilterOrder(key);
  }
}