import Button from '@/components/common/Button';
import PageContent from '@/components/common/layout/PageContent';
import PageHeader from '@/components/common/layout/PageHeader';
import PageRoot from '@/components/common/layout/PageRoot';
import KakaoMapContainer from '@/containers/common/KakaoMapContainer';
import { userAtom } from '@/store/common';
import styles from '@/styles/profile/ProfileUpdate.module.scss';
import { NextPage } from 'next';
import Image from "next/legacy/image";
import { useState } from 'react';
import { Dropdown, Form, SSRProvider } from 'react-bootstrap';
import { CgPiano } from 'react-icons/cg';
import { FaGuitar } from 'react-icons/fa';
import { GiAccordion, GiDrumKit, GiHarp, GiPipeOrgan, GiViolin, GiXylophone } from 'react-icons/gi';
import { useRecoilValue } from 'recoil';

const ProfileUpdate: NextPage = () => {
  const user = useRecoilValue(userAtom);
  const instData: any = {
    drum: { name: '드럼', icon: <GiDrumKit /> },
    drum2: { name: '드럼', icon: <GiDrumKit /> },
    violin: { name: '바이올린', icon: <GiViolin /> },
    accordion: { name: '아코디언', icon: <GiAccordion /> },
    piano: { name: '피아노', icon: <CgPiano /> },
    harp: { name: '하프', icon: <GiHarp /> },
    guitar: { name: '기타', icon: <FaGuitar /> },
    xylophone: { name: '실로폰', icon: <GiXylophone /> },
    timpani: { name: '팀파니', icon: <GiDrumKit /> }, // 아이콘 없음
    organ: { name: '오르간', icon: <GiPipeOrgan /> },
    drum3: { name: '드럼', icon: <GiDrumKit /> },
    accordion2: { name: '아코디언', icon: <GiAccordion /> },
  };

  const [ levelDropdown, setLevelDropdown ] = useState<string>('elementary');

  const step5_students: any = {
    elementary: { name: '초등학생' },
    middle: { name: '중학생' },
    high: { name: '고등학생' },
    college: { name: '대학생' },
  }

  const levelData: any = {
    starting: { name: '입문자', content: '지금 시작해요' },
    beginner: { name: '초급자', content: '1년 미만입니다' },
    middle: { name: '중급자', content: '3년 미만입니다' },
    advanced: { name: '상급자', content: '오랜 취미자, 전공자입니다' },
    student: { name: '가끔 연주하는 학생', content: (
      <SSRProvider>
        <Dropdown className={styles.dropdown} >
          <Dropdown.Toggle>
            <span>{step5_students[levelDropdown].name}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Object.keys(step5_students).map((v)=>{
              const item = step5_students[v];
              return (
                <Dropdown.Item
                  onClick={e => clickLevelDropbox(e,v)}
                  key={v}
                  >
                  {item.name}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </SSRProvider>
    )},
    worker: { name: '가끔 연주하는 직장인', content: '' },
  }

  const step5_genre: any = {
    classic: { name: '클래식' },
    rock: { name: '록' },
    rnb: { name: 'R&B' },
    hiphop: { name: '힙합' },
    blues: { name: '블루스' },
    jazz: { name: '재즈' },
    pop: { name: '팝' },
    electronic: { name: '전자음악'},
    dance: { name: '댄스' },
  }

  return (
    <PageRoot className={styles.root}>
      <PageHeader className={styles.header} prevButton={true}>
        내 프로필 수정
      </PageHeader>
      <PageContent className={styles.content}>
        <div className={styles.img}>
          {/* <Image /> */}
        </div>
        <div className={styles.form}>
          <div className={styles.name}>
            <span>이름</span>
            <Form.Control
              type='text'
              placeholder='이름을 입력해주세요'
              defaultValue={'김가은'}
            />
          </div>
          { user?.type===0 &&
            <div className={styles.gender}>
              <span>성별</span>
              <label>
                <input 
                  className='form-check-input' 
                  type='radio'
                  name='gender'
                  // checked
                />
                남성
              </label>
              <label>
                <input 
                  className='form-check-input' 
                  type='radio'
                  name='gender'
                />
                여성
              </label>
            </div>
          }

          { user?.type===1 &&
            <div className={styles.education}>
              <span>학력</span>
              <Form.Control
                type='text'
                placeholder='학력을 입력해주세요'
                defaultValue={'바이올린 대학교'}
              />
            </div>
          }
        </div>

        { user?.type===1 &&
          <Form.Control
            as='textarea'
            rows={4}
            placeholder='소개를 입력해주세요'
            className={styles.desc}
          />
        }

        <div className={styles.title} style={{margin:'0'}}>동네인증</div>
        <div className={styles.map}>
          <KakaoMapContainer />
        </div>

        <div className={styles.title}>연주가능한 악기</div>
        <div className={styles.instruments}>
          {Object.keys(instData).map((v, k) => {
            const item = instData[v];
            return (
              <div className={styles.item} key={k} onClick={clickInstruments}>
                {item.icon}
                {item.name}
              </div>
            )
          })}
        </div>

        { user?.type===0 &&
          <>
            <div className={styles.title}>연주실력</div>
            <div className={styles.level}>
              {Object.keys(levelData).map((v) => {
                const item = levelData[v];
                return (
                  <div className={styles.item} onClick={clickLevel} key={v}>
                    <div>{item.name}</div>
                    {item.content}
                  </div>
                )
              })}
            </div>
          </>
        }

        { user?.type===1 &&
          <>
            <div className={styles.title}>장르</div>
            <div className={styles.genre}>
              {Object.keys(step5_genre).map((v) => {
                const item = step5_genre[v];
                return (
                  <div className={styles.item} onClick={clickInstruments} key={v}>
                    <div>{item.name}</div>
                  </div>
                )
              })}
            </div>
          </>
        }
        
      </PageContent>
      <Button onClick={()=>{}}>
        수정완료
      </Button>
    </PageRoot>
  )

  function clickInstruments(e: React.MouseEvent) {
    e.currentTarget.classList.toggle(styles.active)
  }

  function clickLevel(e: React.MouseEvent) {
    const cursor = e.currentTarget;

    cursor.closest(`.${styles.level}`)?.
    querySelector(`.${styles.active}`)?.classList.remove(styles.active);

    cursor.classList.toggle(styles.active);
  }

  function clickLevelDropbox(e: React.MouseEvent, student: string) {
    setLevelDropdown(student);
  }
}

export default ProfileUpdate;