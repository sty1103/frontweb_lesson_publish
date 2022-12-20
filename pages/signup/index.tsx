import styles from './index.module.scss';
import { NextPage } from 'next';
import SignPageContent from '@/components/layout/sign/SignPageContent';
import Button from '@/components/button/Button';
import { moveUrl } from '@/utils/common';

const SignUp: NextPage = () => {
  return (
    <SignPageContent className={styles.root}>
      <div className={styles.content}>
        레슨노트에서 이용하실 서비스를 선택해 주세요

        <div className={styles.buttons}>
          <Button
            className={styles.student}
            shape='rect'
            onClick={() => moveUrl('/signup/student')}>
            학생으로 가입
          </Button>
          <Button
            className={styles.student}
            shape='rect'
            onClick={() => moveUrl('/signup/teacher')}>
            선생님으로 가입
          </Button>
        </div>
      </div>
    </SignPageContent>
  )
}

export default SignUp;