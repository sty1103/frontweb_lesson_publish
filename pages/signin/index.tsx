import Button from '@/components/common/Button';
import styles from '@/styles/sign/SignIn.module.scss';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import { MdArrowForwardIos } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { BsApple} from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import router from 'next/router';
import SignContainer from '@/components/sign/SignContainer';

interface Props {
  socials: [];
}

export default function SignIn({ socials }: Props) {
  return (
    <SignContainer className={styles.signin}>
      <div className={styles.logo}>
        {/* <img src='' /> */}
        LESSON NOTE
      </div>

      <div className={styles.form}>
        <label>이메일</label>
        <Form.Control type='email' placeholder='이메일을 입력해 주세요' />
        <label>비밀번호</label>
        <Form.Control type='password' placeholder='비밀번호를 입력해 주세요' />
        <Button shape='rect' onClick={login}>
          로그인
        </Button>
      </div>

      <div className={styles.sub}>
        <label>
          <input type='checkbox' />
          로그인 유지
        </label>
        <div className={styles.forgot} onClick={() => router.push('/forgotpass')}>
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
        <span onClick={() => router.push('/signup')}>
          회원가입
        </span>
      </div>
    </SignContainer>
  )

  function login() {
    router.push('/');
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