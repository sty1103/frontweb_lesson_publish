import React, { useState, useRef } from 'react';
import router from 'next/router';
import styles from './[target].module.scss';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { BsCameraFill } from 'react-icons/bs';
import { GiDrumKit, GiViolin, GiHarp, GiXylophone, GiPipeOrgan, GiAccordion } from 'react-icons/gi';
import { CgPiano } from 'react-icons/cg';
import { FaGuitar } from 'react-icons/fa';

import { Dropdown, Form, SSRProvider } from 'react-bootstrap';
import termsPrivacy from '@/public/terms/privacy';
import termsPromotion from '@/public/terms/promotion';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from "next/legacy/image";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tempUserData, userAtom } from '@/store/common';
import SignPageContent from '@/components/layout/sign/SignPageContent';
import { nl2br } from '@/utils/common';
import Button from '@/components/button/Button';
import KakaoMap from '@/components/contents/KakaoMap';
import termsService from '@/public/terms/service';

interface Props {
  target: string;
}

const SignUpStep: NextPage<Props> = ({ target }) => {
  const [ stepNum, setStepNum ] = useState<number>(1);
  const middleRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step1WarnRef = useRef<HTMLLabelElement>(null);

  const [ step5Dropdown, setStep5Dropdown ] = useState<string>('elementary');

  const step4_inst: any = {
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

  const step5_students: any = {
    elementary: { name: '초등학생' },
    middle: { name: '중학생' },
    high: { name: '고등학생' },
    college: { name: '대학생' },
  }
  
  const step5_level: any = {
    starting: { name: '입문자', content: '지금 시작해요' },
    beginner: { name: '초급자', content: '1년 미만입니다' },
    middle: { name: '중급자', content: '3년 미만입니다' },
    advanced: { name: '상급자', content: '오랜 취미자, 전공자입니다' },
    student: { name: '가끔 연주하는 학생', content: (
      <SSRProvider>
        <Dropdown className={styles.dropdown} >
          <Dropdown.Toggle>
            <span>{step5_students[step5Dropdown].name}</span>
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

  const setUser = useSetRecoilState(userAtom);
  const users = useRecoilValue(tempUserData);

  return (
    <SignPageContent className={styles.root}>
      <div className={styles.top}>
        <span>0{stepNum}</span>
        <span className={styles.seperator}>/</span>
        06
        <span>회원가입</span>
      </div>

      <AiOutlineArrowLeft className={styles.prev} onClick={clickPrev}/>

      {/* <div className={styles.middle} ref={middleRef}> */}
      <div className={`${styles.middle} ${styles.step1}`} ref={middleRef}>
        <div className={styles.step1} ref={step1Ref}>
          약관동의를 진행해주세요
          <label className={styles.warn} ref={step1WarnRef}>
            필수사항에 모두 동의해 주세요
          </label>
          <div className={styles.terms}>
            <div className={`${styles.term} ${styles.all}`}>
              <div className={styles.title}>
                <label onClick={clickTermsAll}>
                  <Form.Check type='checkbox' disabled />
                  모두 동의합니다
                </label>
              </div>
            </div>
            <div className={`${styles.term} ${styles.service}`}>
              <div className={styles.title}>
                <label className={styles.required} onClick={clickTermCheck}>
                  <Form.Check type='checkbox' disabled />
                  이용약관 동의
                  <span>필수</span>
                </label>
                <div className={styles.arrow} onClick={clickTermsDetail}>
                  <IoIosArrowDown />
                </div>
              </div>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{__html: nl2br(termsService)}}
              />
            </div>
            <div className={`${styles.term} ${styles.service}`}>
              <div className={styles.title}>
                <label className={styles.required} onClick={clickTermCheck}>
                  <Form.Check type='checkbox' disabled />
                  개인정보 수집 및 이용 동의
                  <span>필수</span>
                </label>
                
                <div className={styles.arrow} onClick={clickTermsDetail}>
                  <IoIosArrowDown />
                </div>
              </div>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{__html: nl2br(termsPrivacy)}}
              />
            </div>
            <div className={`${styles.term} ${styles.service}`}>
              <div className={styles.title}>
                <label onClick={clickTermCheck}>
                  <Form.Check type='checkbox' disabled />
                  프로모션 정보 수신 동의
                </label>
                
                <div className={styles.arrow} onClick={clickTermsDetail}>
                  <IoIosArrowDown />
                </div>
              </div>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{__html: nl2br(termsPromotion)}}
              />
            </div>
          </div>
          <Button shape='rect' onClick={clickNextTerms}>
              다음
          </Button>
        </div>

        <div className={styles.step2}>
          본인인증을 진행해주세요
          <div className={styles.verify}>
            PASS 인증하기
          </div>
          <Button shape='react' onClick={clickNextVerify}>
            다음
          </Button>
        </div>
        { target === 'student' && 
          <div className={`${styles.step3} ${styles.student}`}>
          프로필 정보를 입력해주세요

          <div className={styles.form}>
            <div className={styles.picture}>
              <BsCameraFill />
              {/* <Image /> */}
            </div>

            <div className={styles.required}>
              <span>이메일</span>
              <Form.Control type='email' placeholder='이메일을 입력해 주세요' />
            </div>

            <div className={styles.required}>
              <span>비밀번호</span>
              <div>
                <Form.Control type='password' placeholder='비밀번호를 입력해주세요' style={{marginBottom:'6px'}} />
                <Form.Control type='password' placeholder='비밀번호를 한번 더 입력해주세요' />
              </div>
            </div>

            <div className={styles.required}>
              <span>이름</span>
              <Form.Control type='text' placeholder='이름을 입력해 주세요' />
            </div>

            <div className={styles.required}>
              <span>성별</span>
              <div>
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
            </div>
          </div>

          <Button shape='react' onClick={clickNextVerify}>
            다음
          </Button>
        </div>
        }
        
        { target === "teacher" && 
          <div className={`${styles.step3} ${styles.student}`}>
            프로필 정보를 입력해주세요

            <div className={styles.form}>
              <div className={styles.picture}>
                <BsCameraFill />
                {/* <Image /> */}
              </div>

              <div className={styles.required}>
                <span>이메일</span>
                <Form.Control type='email' placeholder='이메일을 입력해 주세요' />
              </div>

              <div className={styles.required}>
                <span>비밀번호</span>
                <div>
                  <Form.Control type='password' placeholder='비밀번호를 입력해주세요' style={{marginBottom:'6px'}} />
                  <Form.Control type='password' placeholder='비밀번호를 한번 더 입력해주세요' />
                </div>
              </div>

              <div className={styles.required}>
                <span>이름</span>
                <Form.Control type='text' placeholder='이름을 입력해 주세요' />
              </div>

              <div>
                <span>학력</span>
                <Form.Control type='text' placeholder='학력을 입력해 주세요' />
              </div>

              <div>
                <span>소개</span>
                <Form.Control as='textarea' rows={4} placeholder='소개를 입력해주세요' />
              </div>
            </div>

            <Button shape='react' onClick={clickNextVerify}>
              다음
            </Button>
          </div>
        }

        <div className={styles.step4}>
          연주할 수 있는 악기를 선택해주세요
          <div className={styles.items}>
            {Object.keys(step4_inst).map((v, k) => {
              const item = step4_inst[v];
              return (
                <div className={styles.item} key={k} onClick={clickInstruments}>
                  {item.icon}
                  {item.name}
                </div>
              )
            })}
          </div>

          <Button shape='react' onClick={clickNextInstruments}>
            다음
          </Button>
        </div>

        { target === "student" && 
          <div className={`${styles.step5} ${styles.student}`}>
            연주 실력은 어느 정도인가요?
            <div className={styles.items}>
              {Object.keys(step5_level).map((v) => {
                const item = step5_level[v];
                return (
                  <div className={styles.item} onClick={clickLevel} key={v}>
                    <div>{item.name}</div>
                    {item.content}
                  </div>
                )
              })}
            </div>

            <Button shape='react' onClick={clickNextInstruments}>
              다음
            </Button>
          </div>
        }

        { target === "teacher" && 
          <div className={`${styles.step5} ${styles.teacher}`}>
            선호하는 장르를 선택해주세요
            <div className={styles.items}>
              {Object.keys(step5_genre).map((v) => {
                const item = step5_genre[v];
                return (
                  <div className={styles.item} onClick={clickInstruments} key={v}>
                    <div>{item.name}</div>
                  </div>
                )
              })}
            </div>

            <Button shape='react' onClick={clickNextInstruments}>
              다음
            </Button>
          </div>
        }
        
        <div className={styles.step6}>
          동네인증을 해주세요
          <div className={styles.map}>
            <KakaoMap />
          </div>
          <Button shape='react' onClick={clickDone}>
            완료
          </Button>
        </div>
      </div>
    </SignPageContent>
  )

  function clickPrev() {
    if ( stepNum === 1 ) {
      router.back();
    } else {
      const prevStepNum = stepNum - 1;
      middleRef?.current!.classList.remove(`${styles[`step${stepNum}`]}`);
      middleRef?.current!.classList.add(`${styles[`step${prevStepNum}`]}`);
      setStepNum(Math.max(stepNum-1, 1));
    }
  }

  function next() {
    const nextStepNum = stepNum + 1;
    middleRef?.current!.classList.remove(`${styles[`step${stepNum}`]}`);
    middleRef?.current!.classList.add(`${styles[`step${nextStepNum}`]}`);
    setStepNum(Math.min(stepNum+1, 6));
  }

  function clickTermsAll(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    let all: HTMLInputElement|null = step1Ref.current!.querySelector(`.${styles.all} input`);
    const checkboxes = step1Ref.current?.querySelectorAll(`.${styles.term}:not(.${styles.all}) input`);

    all!.checked = !all!.checked;
    checkboxes?.forEach((v) => {
      const checkbox = v as HTMLInputElement;
      checkbox.checked = all!.checked;
    });
  }

  function clickTermCheck(e: React.MouseEvent) {
    e.preventDefault();

    let all: HTMLInputElement|null = step1Ref.current!.querySelector(`.${styles.all} input`);
    const checkbox: HTMLInputElement|null = e.currentTarget.querySelector('input');
    checkbox!.checked = !checkbox!.checked

    const checkedNum = step1Ref.current?.querySelectorAll(`.${styles.term}:not(.${styles.all}) input[type=checkbox]:checked`).length;

    all!.checked = checkedNum===3;
  }

  function clickTermsDetail(e: React.MouseEvent) {
    const target = e.currentTarget.closest(`.${styles.term}`);

    if ( target?.classList.contains(styles.active) ) {
      target?.classList.remove(styles.active);
    } else {
      target?.classList.add(styles.active);
    }
  }

  function clickNextTerms() {
    const required = step1Ref.current?.querySelectorAll(`.${styles.required} input[type=checkbox]:checked`).length;

    if ( required == 2 ) {
      step1WarnRef!.current?.classList.remove(styles.active);
      next();
    } else {
      step1WarnRef!.current?.classList.add(styles.active)
    }
  }

  function clickNextVerify() {
    next();
  }

  function clickDone() {
    users.map((v,k) => {
      if ( v.auth === target ) {
        setUser(v);
        localStorage.setItem('user', target);
      }
    })

    router.push('/');
  }

  function clickInstruments(e: React.MouseEvent) {
    e.currentTarget.classList.toggle(styles.active)
  }

  function clickNextInstruments() {
    next();
  }

  function clickLevel(e: React.MouseEvent) {
    const cursor = e.currentTarget;

    cursor.closest(`.${styles.items}`)?.
    querySelector(`.${styles.active}`)?.classList.remove(styles.active);

    cursor.classList.toggle(styles.active);
  }

  function clickLevelDropbox(e: React.MouseEvent, student: string) {
    setStep5Dropdown(student);
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    { params: { target:'student'} },
    { params: { target:'teacher'} },
  ];

  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      target: params?.target
    }
  }
}

export default SignUpStep;