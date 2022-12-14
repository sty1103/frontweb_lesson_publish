import styles from './ScoreControlPannel.module.scss';
import OSMDExtends, { TMeasures } from "@/modules/OSMDExtends";
import { curMeasureAtom, IMeasureData, linkedMeasureAtom, measureDataAtom, osmdAtom } from "@/store/score";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Button from "@/components/button/Button";
import { BsRecordCircle, BsRecordCircleFill } from 'react-icons/bs';
import { FaStickyNote, FaTimes, FaVideo } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Form } from 'react-bootstrap';
import { userAtom } from '@/store/common';
import LessonVideoPopup from '@/components/popup/lesson/LessonVideoPopup';
import LessonRecordingPopup from '@/components/popup/lesson/LessonRecordingPopup';

const initMemoInputState = { display:'none', top:0, left:0, width:0 } // 메모 input의 위치

export default function ScoreControlPannel() {
  const [ measures, setMeasures ] = useState<TMeasures>([]); // 마디들의 위치와 크기 정보 저장
  const [ measureData, setMeasureData ] = useRecoilState(measureDataAtom); // 마디 유저 데이터
  const [ curMeasure, setCurMeasure ] = useRecoilState(curMeasureAtom); // 현재 활성화된 마디/보표 번호
  const linkedMeasure = useRecoilValue(linkedMeasureAtom); // 마디링크 클릭 시 타깃 마디 지정

  const [ videoPopup, setVideoPopup ] = useState<boolean>(false); // 마디 비디오 모달의 노출 여부
  const [ recordingPopup, setRecordingPopup ] = useState<boolean>(false); // 마디 녹음 모달의 노출 여부
  const [ memoInputState, setMemoInputState ] = useState(initMemoInputState); // 마디 위 메모 입력창 상태
  const [ hideContents, setHideContents ] = useState<boolean>(false); // 콘텐츠 숨기기 상태
  
  const noteRef = useRef<HTMLInputElement | null>(null); // 노트 작성 input reference
  const user = useRecoilValue(userAtom);

  const [ osmd, setOsmd ] = useRecoilState(osmdAtom);

  // 창 크기가 변경되면 악보의 크기가 자동으로 조절되는데, 컨트롤러의 사이즈도 악보에 맞춰서 다시 렌더를 해줘야 함
  let timeout: ReturnType<typeof setTimeout>;
  const renderControlPannel = () => {
    if ( timeout )
      clearTimeout(timeout);

    timeout = setTimeout(() => {
      if ( osmd ) {
        let newOsmd = Object.assign(Object.create(Object.getPrototypeOf(osmd)), osmd);
        setOsmd(newOsmd);
      }

      window.removeEventListener('resize', renderControlPannel);
    }, 400);
  }
  
  useEffect(() => {
    // 데이터베이스에서 마디 정보 fetch
    // 일단 임시로 데이터 설정
    if ( !measureData.length ) {
      setMeasureData([
        { measure: 2, staff: 0, memo: '점점 강하게', recording: '', video: true },
        { measure: 6, staff: 2, memo: '짧게 튕기는 느낌으로', recording: '', video: false },
        { measure: 9, staff: 1, memo: '약하게', recording: '', video: true },
      ])
    }
    
    if ( osmd )
      setMeasures(osmd.getMeasurePosition());

    noteRef.current!.focus();
    window.addEventListener('resize', renderControlPannel);
  }, [osmd, memoInputState, measureData.length, setMeasureData]);

  return (
    <>
      <section className={`${styles.root} ${hideContents ? styles.hide:''}`} onClick={initElements}>
        {
          measures.map((measure, i) => {
            return measure.map((staff, j) => {
              const measureDataOne: IMeasureData | undefined = getMeasureDataOne(measureData, i, j);
              return (
                <div 
                  key={j}
                  data-measure={i}
                  data-staff={j}
                  className={`
                    ${styles.measure}
                    measure${i} staff${j}
                    ${linkedMeasure===i ? styles.active:''}
                  `}
                  style={{
                    top: `${staff.top + 60}px`,
                    left: `${staff.left}px`,
                    width: `${staff.width}px`,
                    height: `${staff.height}px`
                  }}
                >
                  <div className={styles.indicator}>
                    <div className={`${styles.memo} ${measureDataOne?.memo ? '':styles.hide}`} onClick={clickMemo}>
                    <FaStickyNote />
                      <label>{measureDataOne?.memo}</label>
                    </div>

                    <div className={`${styles.video} ${measureDataOne?.video ? '':styles.hide}`} onClick={clickVideoBtn}>
                      <FaVideo />
                    </div>

                    <div className={`${styles.recording} ${measureDataOne?.recording ? '':styles.hide}`} onClick={clickRecording}>
                    <BsRecordCircle />

                      <div className={styles['audio-wrapper']}>
                        <audio
                          src={measureDataOne?.recording}
                          controlsList='nodownload'
                          controls>
                        </audio>
                        <Button onClick={clickCloseRecordingBtn} shape='circle'>
                          <FaTimes />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  { user?.type === 1 && 
                    <Button onClick={clickMenuBtn} shape='circle' className={styles.menu}>
                      <HiOutlineDotsVertical />
                    </Button>
                  }
                  <ul className={`${styles.dropdown} measure${i} staff${j}`}>
                    <li onClick={clickMemoBtn}><FaStickyNote /> 메모 추가</li>
                    <li onClick={clickVideoBtn}><FaVideo /> 영상 추가</li>
                    <li onClick={clickRecordingBtn}><BsRecordCircleFill /> 녹음 추가</li>
                    {/* <li onClick={clickCheckBtn}><FontAwesomeIcon icon={faSquareCheck} /> 마디 체크</li> */}
                  </ul>
                </div>
              )
            })
          })
        }
        
        <Form.Control
          className={styles.memoInput}
          type='text'
          placeholder='메모를 입력해 주세요'
          ref={noteRef}
          style={{ ...memoInputState }}
          onKeyPress={enterMemoInput}
          onClick={(e) => e.stopPropagation()}
        >
        </Form.Control>

        <LessonVideoPopup show={videoPopup} onClose={closeVideoPopup} />
        <LessonRecordingPopup show={recordingPopup} onClose={closeRecordingPopup} />
      </section>
      {/* <Button className={`${styles.hideContent} ${hideContents ? styles.active:''}`} onClick={clickHideContentsBtn} color={hideContents ? 'white':'black'}>
        <label><FontAwesomeIcon icon={faEyeSlash}/> 콘텐츠 숨기기</label>
        <label><FontAwesomeIcon icon={faEye} /> 콘텐츠 보이기</label>
      </Button> */}
    </>
  )

  // 마디 메뉴 버튼 클릭 이벤트
  function clickMenuBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    initElements(e);

    const measureEl: HTMLDivElement | null = e.currentTarget.closest(`.${styles.measure}`);
    
    if ( measureEl ) {
      const measure: number = parseInt(measureEl.dataset.measure!); // 현재 마디 번호
      const staff: number = parseInt(measureEl.dataset.staff!); // 현재 보표 번호
      document.querySelector(`.${styles.dropdown}.measure${measure}.staff${staff}`)?.classList.add(styles.active)
      setCurMeasure(() => ({measure, staff}))
    }
  }

  // 마디 메모 버튼 클릭 이벤트
  function clickMemoBtn(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    initElements(e);
    
    const measureEl: HTMLDivElement | null = e.currentTarget.closest(`.${styles.measure}`);
    
    if ( measureEl ) {
      const measure: number = parseInt(measureEl.dataset.measure!); // 현재 마디 번호
      const staff: number = parseInt(measureEl.dataset.staff!); // 현재 보표 번호
      const measurePos = measures[measure][staff]; // 현재 마디/보표의 위치/크기 정보
      const measureDataOne: IMeasureData | undefined = getMeasureDataOne(measureData, measure, staff); // 현재 마디/보표의 사용자 데이터

      setMemoInputState({
        display: 'block',
        top: measurePos.top + 16,
        left: measurePos.left,
        width: measurePos.width - 14
      });
      
      noteRef.current!.value = measureDataOne ? measureDataOne.memo:'';
    }
  }

  function enterMemoInput(e: React.KeyboardEvent<HTMLInputElement>) {
    e.stopPropagation();

    if ( e.key === 'Enter' ) {
      const newMeasureData = [ ...measureData ];
      const memo = noteRef.current!.value;
      const index = getMeasureDataIndex(measureData, curMeasure.measure, curMeasure.staff);
      
      if ( index < 0 ) {
        newMeasureData.push({
          measure: curMeasure.measure,
          staff: curMeasure.staff,
          memo,
          recording: '',
          video: false
        });
      } else {
        newMeasureData[index] = { ...newMeasureData[index], memo };
      }

      setMeasureData(newMeasureData);
      setMemoInputState({...initMemoInputState});
    }
  }

  function clickRecordingBtn(e: React.MouseEvent<HTMLElement>) {
    setRecordingPopup(true);
  }

  function clickRecording(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.classList.add(styles.active);
  }

  function clickCloseRecordingBtn(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const recordingEl = e.currentTarget.closest(`.${styles.recording}`);
    recordingEl?.classList.remove(styles.active);
    recordingEl?.querySelector('audio')?.pause();
  }

  function closeRecordingPopup() {
    setRecordingPopup(false);
  }

  function clickMemo(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.classList.toggle(`${styles.active}`);
  }

  function clickVideoBtn() {
    setVideoPopup(true);
  }

  function closeVideoPopup() {
    setVideoPopup(false);
  }

  function initElements(e: React.MouseEvent<HTMLElement> | null) {
    document.querySelector(`.${styles.dropdown}.${styles.active}`)?.classList.remove(styles.active);

    if ( memoInputState.display !== 'none' )
      setMemoInputState({ ...initMemoInputState });
  }

  // function clickHideContentsBtn(e: React.MouseEvent<HTMLElement>) {
  //   setHideContents( !hideContents );
  // }
}

export function getMeasureDataOne(data: IMeasureData[], measure: number, staff: number) {
  return data.find(obj => obj.measure===measure && obj.staff===staff)
}

export function getMeasureDataIndex(data: IMeasureData[], measure: number, staff: number) {
  return data.findIndex(m => {
    return m.measure===measure && m.staff===staff;
  });
}