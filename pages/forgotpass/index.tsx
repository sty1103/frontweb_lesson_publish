import { useRef, useState } from 'react';
import Button from '@/components/common/Button';
import styles from '@/styles/sign/ForgotPass.module.scss';
import { Next } from 'react-bootstrap/esm/PageItem';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Form } from 'react-bootstrap';
import SignContainer from '@/components/sign/SignContainer';
import { NextPage } from 'next';
import { moveUrl } from '@/lib/utils';

const ForgotPass: NextPage = () => {
  const [ stepNum, setStepNum ] = useState<number>(1);
  const middleRef = useRef<HTMLDivElement>(null);

  return (
    <SignContainer className={styles.root}>
      <div className={styles.top}>
        <span>0{stepNum}</span>
        <span className={styles.seperator}>/</span>
        02
        <span>비밀번호 찾기</span>
      </div>

      <AiOutlineArrowLeft className={styles.prev} onClick={prev}/>

      <div className={styles.middle} ref={middleRef}>
        <div className={styles.step1}>
          가입할 때 입력하신<br/>
          이메일 주소를 통해<br/>
          인증코드를 보내드립니다

          <div className={styles.form}>
            <label>이메일</label>
            <div>
              <Form.Control type='email' placeholder='이메일을 입력해 주세요' />
              <Button onClick={() => {}}>
                전송
              </Button>
            </div>

            <label>인증코드</label>
            <Form.Control type='text' onClick={() => {}} placeholder='인증코드를 입력해 주세요' />
          </div>
          <Button shape='rect' onClick={next}>
            다음
          </Button>
        </div>
        
        <div className={`step ${styles.step2}`}>
          새 비밀번호를 설정해주세요

          <div className={styles.form}>
            <label>새 비밀번호</label>
            <Form.Control type='password' placeholder='새 비밀번호를 입력해 주세요' />
            <label>새 비밀번호 확인</label>
            <Form.Control type='password' placeholder='새 비밀번호를 확인해 주세요' />
          </div>
          <Button shape='rect' onClick={clickDone}>
            완료
          </Button>
        </div>
      </div>
    </SignContainer>
  )

  function prev() {
    if ( stepNum === 1 ) {
      moveUrl('/signin');
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
    setStepNum(Math.min(stepNum+1, 4));
  }

  function clickDone() {
    moveUrl('/signin');
  }
}

export default ForgotPass;