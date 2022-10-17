import React, { useState, useRef } from 'react';
import router, { useRouter } from 'next/router';
import SignContainer from '@/components/sign/SignContainer';
import styles from '@/styles/sign/SignUpStep.module.scss';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { BsCameraFill } from 'react-icons/bs';
import { Form } from 'react-bootstrap';
import Button from '@/components/common/Button';
import termsService from '@/public/terms/service';
import termsPrivacy from '@/public/terms/privacy';
import termsPromotion from '@/public/terms/promotion';
import { nl2br } from '@/lib/utils';
import KakaoMapContainer from '@/containers/common/KakaoMapContainer';
import ErrorPage from '@/components/common/ErrorPage';
import { NextPage, GetStaticProps, GetStaticPathsResult, GetStaticPaths } from 'next';

interface Props {
  target: string;
}

const SignUpStep: NextPage<Props> = ({ target }) => {
  const [ stepNum, setStepNum ] = useState<number>(1);
  const middleRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step1WarnRef = useRef<HTMLLabelElement>(null);

  return (
    <SignContainer className={styles.signup}>
      <div className={styles.top}>
        <span>0{stepNum}</span>
        <span className={styles.seperator}>/</span>
        06
        <span>회원가입</span>
      </div>

      <AiOutlineArrowLeft className={styles.prev} onClick={prev}/>

      <div className={styles.middle} ref={middleRef}>
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

        <div className={styles.step3}>
          프로필 정보를 입력해주세요
          <div className={styles.form}>
            <div className={styles.top}>
              <div className={styles['top--left']}>
                <BsCameraFill />
                {/* <Image src='' alt='' 
                width='' height='' objectFit='cover' 'fill' /> */}
              </div>
              <div className={styles['top--right']}>
                <Form.Control type='text' placeholder='이름' />
                <Form.Control type='text' placeholder='학력(선택)' />
              </div>
            </div>

            <Form.Control as='textarea' rows={5} placeholder='소개글' />

            <div className={styles.bottom}>

            </div>
          </div>
          <Button shape='react' onClick={clickNextVerify}>
            다음
          </Button>
        </div>

        <div className={styles.step4}>

        </div>

        <div className={styles.step5}>

        </div>
        
        <div className={styles.step6}>
          동네인증을 해주세요
          <div className={styles.map}>
            <KakaoMapContainer />
          </div>
          <Button shape='react' onClick={clickDone}>
            완료
          </Button>
        </div>
      </div>
    </SignContainer>
  )

  function prev() {
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
    router.push('/');
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    { params: { target:'student'} },
    { params: { target:'teacher'} },
  ]

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