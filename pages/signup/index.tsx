import Button from '@/components/common/Button';
import SignContainer from '@/components/sign/SignContainer';
import styles from '@/styles/sign/SignUp.module.scss';
import { NextPage } from 'next';
import { moveUrl } from '@/lib/utils';

const SignUp: NextPage = () => {
  return (
    <SignContainer className={styles.signup}>
      <div className={styles.content}>
        레슨노트에서 이용하실 서비스를 선택해 주세요

        <div className={styles.buttons}>
          <Button
            className={styles.student}
            shape='rect'
            onClick={() => clickButton('student')}>
            학생으로 가입
          </Button>
          <Button
            className={styles.student}
            shape='rect'
            onClick={() => clickButton('teacher')}>
            선생님으로 가입
          </Button>
        </div>
      </div>
    </SignContainer>
  )

  function clickButton(target: string) {
    if ( target === "student" ) {
      moveUrl('/signup/student');
    } else {
      moveUrl('/signup/teacher');
    }
  }
}

export default SignUp;