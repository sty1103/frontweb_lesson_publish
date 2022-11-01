import { GetServerSideProps, NextPage } from "next"
import styles from '@/styles/lesson/LessonDetail.module.scss';
import ScoreDisplayContainer from "@/containers/score/ScoreDisplayContainer";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AlertDropdownContainer from "@/containers/AlertDropdownContainer";
import ProfileDropdownContainer from "@/containers/ProfileDropdownContainer";
import router from 'next/router';
import Button from "@/components/common/Button";
import { BsChatDots, BsCheckLg } from "react-icons/bs";
import { useState } from "react";

const LessonDetail: NextPage = () => {
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <div className={styles.wrapper}>
            <AiOutlineArrowLeft onClick={() => router.back()} />
            <span className={styles.title}>
              너를 만나 - 폴킴
            </span>
            <span>
              <AlertDropdownContainer className={styles.alert} />
              <ProfileDropdownContainer className={styles.profile} />
            </span>
          </div>
        </nav>

        <div className={styles.score}>
          <ScoreDisplayContainer file='/musicxml/For_Exhibition_I will.xml' title={true}/>
        </div>

        <div className={`${styles.buttons} ${menu ? styles.active:''}`}>
          <Button className={styles.menu} onClick={clickMenu}>
            <div className={styles.icon}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Button>
          <Button className={styles.complete} onClick={clickChatBtn}>
            <BsCheckLg />
          </Button>
          <Button className={styles.chat} onClick={clickChatBtn}>
            <BsChatDots />
          </Button>
        </div>
      </div>

      <div className={styles.chat}>
        123
      </div>
      
    </section>
  );

  function clickMenu() {
    setMenu(!menu);
  }

  function clickChatBtn() {

  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = {
    id: context.query.id
  }

  return {
    props
  }
};

export default LessonDetail;