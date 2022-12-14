import { GetServerSideProps, NextPage } from "next"
import styles from './[id].module.scss';
import { AiFillPicture, AiOutlineArrowLeft, AiOutlinePlusCircle } from "react-icons/ai";
import router from 'next/router';
import { BsCameraVideoFill, BsChatDots, BsCheckLg } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";
import { FaTimes } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { linkedMeasureAtom } from "@/store/score";
import NotificationDropdown from "@/components/dropdown/topNavBar/NotificationDropdown";
import ProfileDropdown from "@/components/dropdown/topNavBar/ProfileDropdown";
import Score from "@/components/score/Score";
import Button from "@/components/button/Button";
import LessonEndsPopup from "@/components/popup/lesson/LessonEndsPopup";

const LessonDetail: NextPage = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const [attachDropdown, setAttachDropdown] = useState<boolean>(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  // const 
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [linkedMeasure, setLinkedMeasure] = useRecoilState(linkedMeasureAtom);
  const [chatWindow, setChatWindow] = useState<boolean>(false);
  const [endsPopup, setEndsPopup] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('click', () => {
      setAttachDropdown(false);
      setMenu(false);
    });

    chatContentRef.current?.scrollTo(0, chatContentRef.current.scrollHeight);

    // // mobile address bar 계산
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    setIsMobile(window.innerWidth <= 540);
  }, [chatWindow]);

  return (
    <section className={`${styles.root} ${chatWindow ? styles.chat:''}`}>
      <div className={styles.content} ref={mainContentRef}>
        <nav className={styles.nav}>
          <div className={styles.wrapper}>
            <AiOutlineArrowLeft onClick={() => router.back()} />
            <span className={styles.title}>
              너를 만나 - 폴킴
            </span>
            <span>
              <NotificationDropdown className={styles.alert} />
              <ProfileDropdown className={styles.profile} />
            </span>
          </div>
        </nav>

        <div className={styles.score}>
          {/* <ScoreDisplayContainer file='/musicxml/For_Exhibition_I will.xml' control={true} /> */}
          <Score file='/musicxml/Beethoven_AnDieFerneGeliebte.xml' control={true} isChatOpen={chatWindow} />
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
          <Button className={styles.lessonends} onClick={clickLessonEnds}>
            <BsCheckLg />
          </Button>
          <Button className={styles.chat} onClick={clickShowChat}>
            <BsChatDots />
          </Button>
        </div>
      </div>

      <div className={styles.chat}>
        <div className={styles.nav}>
          <div className={styles.img}>
            {/* <Image /> */}
          </div>
          김은수
          <FaTimes onClick={clickCloseChat} />
        </div>

        <div className={styles.content} ref={chatContentRef}>
          <div className={styles.teacher}>
            <div className={styles.top}>
              <span className={styles.measure}>
                <span onClick={e => clickMeasureLink(e, 0)}>1마디</span>
                <span onClick={e => clickMeasureLink(e, 6)}>7마디</span>
                <span onClick={e => clickMeasureLink(e, 12)}>13마디</span>
              </span>
              <span className={styles.time}>
                1시간 전
              </span>
            </div>
            <div className={styles.content}>
              이 구간에서는 조금 더 느리게 연주해주세요
            </div>
          </div>

          <div className={styles.teacher}>
            <div className={styles.top}>
              <span className={styles.measure}>
              <span onClick={e => clickMeasureLink(e, 14)}>15마디</span>
              </span>
              <span className={styles.time}>
                1시간 전
              </span>
            </div>
            <div className={styles.content}>
              여기도 조금 빠르네요
            </div>
          </div>

          <div className={styles.student}>
            <div className={styles.top}>
              <span className={styles.measure}>
                <span onClick={e => clickMeasureLink(e, 0)}>1마디</span>
              </span>
              <span className={styles.time}>
                1시간 전
              </span>
            </div>
            <div className={styles.content}>
              이렇게 하는 거 맞나요?
              <video controls>
                <source src='/videos/piano_play.mov' type="video/mp4" />
                브라우저가 비디오 재생을 지원히지 않습니다.
              </video>
            </div>
          </div>
        </div>

        <div className={styles.message}>
          <div className={styles.wrapper}>
            <div
              className={styles.text}
              ref={messageRef}
              contentEditable
              suppressContentEditableWarning={true}
            ></div>

            <div className={styles.attachments}>
              <div className={styles.item}>
                {/* <Image /> */}
                <div className={styles.delete}>
                  <FaTimes />
                </div>
              </div>
              <div className={styles.item}>
                {/* <Image /> */}
                <div className={styles.delete}>
                  <FaTimes />
                </div>
              </div>
            </div>

            <div className={styles.measures}>
              <span>1마디 <FaTimes /></span>
              <span>2마디 <FaTimes /></span>
            </div>

            <div className={styles.controls}>
              <div className={`${styles.attach} ${attachDropdown ? styles.active:''}`} onClick={clickAttach}>
                <AiOutlinePlusCircle />
                <ul className={styles.dropdown}>
                  <li>
                    <AiFillPicture /> 사진 첨부
                  </li>
                  <li>
                    <BsCameraVideoFill /> 영상 첨부
                  </li>
                </ul>
              </div>
              
              <Button className={styles.send} onClick={clickChatSend}>
                전송
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LessonEndsPopup show={endsPopup} onClose={closeLessonEnds} />
    </section>
  );
  
  function clickMenu() {
    setTimeout(() => setMenu(!menu), 0);
  }

  function clickLessonEnds() {
    if ( window.confirm('레슨을 종료하시겠습니까?') ) {
      setEndsPopup(true);
    }
  }

  function closeLessonEnds() {
    router.back();
  }

  function clickShowChat() {
    setChatWindow(!chatWindow);
    
    if ( isMobile ) {
      document.querySelector('body')?.classList.toggle('noscroll');
    }
  }

  function clickCloseChat() {
    setChatWindow(false);

    if ( isMobile ) {
      document.querySelector('body')?.classList.remove('noscroll');
    }
  }

  function clickMeasureLink(e: React.MouseEvent, measure: number) {
    if ( linkedMeasure >= 0 ) // 현재 링크된 마디가 선택 중이면 무시
      return;

    // 모바일일 경우엔 채팅 창을 닫고 스크롤 이동
    if ( isMobile ) {
      setChatWindow(false);
      document.querySelector('body')?.classList.remove('noscroll');
    }

    setLinkedMeasure(measure);
    setTimeout(() => {
      setLinkedMeasure(-1);
    }, 1500);

    const target = mainContentRef.current?.querySelector(`.measure${measure}`) as HTMLElement;

    const top = target.offsetTop - 90;
    // mainContentRef.current?.scrollTo({top, behavior: 'smooth'});
    window.scrollTo({top, behavior: 'smooth'});
  }

  function clickAttach() {
    setTimeout(() => setAttachDropdown(!attachDropdown), 0);
  }

  function clickChatSend() {
    // 채팅 전송 버튼
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