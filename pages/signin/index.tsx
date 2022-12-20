import styles from './index.module.scss';
import Form from 'react-bootstrap/Form';
import { MdArrowForwardIos } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { BsApple} from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { NextPage } from 'next';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store/common';
import SignPageContent from '@/components/layout/sign/SignPageContent';
import Button from '@/components/button/Button';
import { moveUrl } from '@/utils/common';

interface Props {
  socials: [];
}

const SignIn: NextPage<Props> = ({ socials }) => {
  const [ user, setUser ] = useRecoilState(userAtom)
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  return (
    <SignPageContent className={styles.root}>
      <div className={styles.logo}>
        {/* <img src='' /> */}
        LESSON NOTE
      </div>

      <div className={styles.form}>
        <label>이메일</label>
        <Form.Control type='email' placeholder='이메일을 입력해 주세요' ref={emailRef} defaultValue='teacher' />
        <label>비밀번호</label>
        <Form.Control type='password' placeholder='비밀번호를 입력해 주세요' ref={pwdRef} defaultValue='password' />
        <Button onClick={login}>
          로그인
        </Button>
      </div>

      <div className={styles.sub}>
        <label>
          <input type='checkbox' />
          로그인 유지
        </label>
        <div className={styles.forgot} onClick={() => moveUrl('/password')}>
          비밀번호 찾기
          <MdArrowForwardIos />
        </div>
      </div>

      <div className={styles.social}>
        SNS로 시작하기
        <div className={styles.buttons}>
          <span><FcGoogle /></span>
          <span><FaFacebookF /></span>
          <span><BsApple /></span>
        </div>
      </div>

      <div className={styles.signup}>
        아직 레슨노트 회원이 아니세요?
        <span onClick={() => moveUrl('/signup')}>
          회원가입
        </span>
      </div>
    </SignPageContent>
  )

  function login() {
    const email = emailRef.current!;
    const pwd = pwdRef.current!;

    email.classList.remove(styles.active);
    pwd.classList.remove(styles.active);

    if ( !email.value ) {
      email.classList.add(styles.active);
      return email.focus();
    } else if ( !pwd.value ) {
      pwd.classList.add(styles.active);
      return pwd.focus();
    } else {
      if ( email.value === 'student' ) {
        setUser({
          type: 0,
          email: 'student@gmail.com',
          name: '학생',
          auth: 'student'
        })
        localStorage.setItem('user', 'student');
      } else {
        setUser({
          type: 1,
          email: 'teacher@gmail.com',
          name: '선생님',
          auth: 'teacher'
        })
        localStorage.setItem('user', 'teacher');
      }

      moveUrl('/');
    }
  }
}

export function getStaticProps() {
  const socials = ['google', 'facebook', 'apple'];
  return {
    props: {
      socials
    }
  }
}

export default SignIn;