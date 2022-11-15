import styles from '@/styles/popups/LessonRecordingPopup.module.scss';
import PopUp from '@/components/common/PopUp';
import { FaTimes } from 'react-icons/fa';
import Image from "next/legacy/image";
import Button from '../common/Button';
import { BsFillStopCircleFill, BsFillTrashFill, BsRecordCircleFill } from 'react-icons/bs';
import { useRecoilState, useRecoilValue } from 'recoil';
import { curMeasureAtom, measureDataAtom } from '@/store/score';
import { getMeasureDataIndex, getMeasureDataOne } from '../score/ScoreController';
import { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string;
  show?: boolean
  onClose?: Function;
}

export default function LessonRecordingPopup({ className, show=false, onClose=()=>{} }: Props) {

  const [ measureData, setMeasureData ] = useRecoilState(measureDataAtom);
  const curMeasure = useRecoilValue(curMeasureAtom);
  const measureDataOne = getMeasureDataOne(measureData, curMeasure.measure, curMeasure.staff);

  const audioRef = useRef<HTMLAudioElement>(null); // <audio> 접근 변수
  const [ isRecording, setIsRecording ] = useState<boolean>(false); // 녹음 중인지 여부 상태
  const [ isRecorded, setIsRecorded ] = useState<boolean>(false); // 현재 녹음된 상태인지 여부
  let audioArray: Blob[] = [];
  let [ mediaRecorder, setMediaRecorder ] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    mediaRecorder?.start();
  }, [mediaRecorder])

  useEffect(() => {
    setIsRecorded(measureDataOne?.recording ? true:false);
  }, [show])

  return (
    <PopUp
      className={`${styles.root} ${className}`}
      show={show}
      onClose={() => onClose()}
    >
      <div className={styles.header}>
        녹음
        <FaTimes onClick={() => onClose()} />
      </div>

      <div className={styles.content}>
        <div className={styles.buttons}>
          <Button onClick={clickRecordingBtn} className={ isRecording ? styles.active:'' }>
            <label className={ isRecording ? '':styles.active }>
              <BsRecordCircleFill />
              <label>녹음 시작</label>
            </label>
            <label className={ isRecording ? styles.active:'' }>
              <BsFillStopCircleFill />
              <label>녹음 중지</label>
            </label>
          </Button>

          <Button
            onClick={clickRemoveBtn}
            className={`${styles.remove} ${isRecorded ? styles.active:''}`}
          >
            <BsFillTrashFill />
          </Button>
        </div>

        <audio
          className={`
            ${styles.audio}
            ${isRecorded ? styles.active:''}
          `}
          ref={audioRef}
          src={measureDataOne?.recording}
          controls>
        </audio>
      </div>

      <div className={styles.footer}>
        <Button onClick={clickSaveBtn} className={styles.save}>
          저장하기
        </Button>
      </div>
    </PopUp>
  )

  async function clickRecordingBtn() {
    if ( !isRecording ) {
      if ( isRecorded && !window.confirm('이전 녹음을 지우고 새로 녹음하시겠습니까?') ) return;

      const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});

      let newMediaRecorder = new MediaRecorder(mediaStream);
      newMediaRecorder.ondataavailable = (e) => {
        audioArray.push(e.data);
      }

      newMediaRecorder.onstop = (e) => {
        const blob = new Blob(audioArray, {type: 'audio/mp3 codecs=mpeg'});
        audioArray = [];
        audioRef!.current!.src = window.URL.createObjectURL(blob);
      }

      setMediaRecorder(newMediaRecorder);
      setIsRecording(true);
      setIsRecorded(false);
    } else {
      mediaRecorder?.stop();
      setIsRecorded(true);
      setIsRecording(false);
    }
  }

  function clickRemoveBtn() {
    if( window.confirm('녹음을 삭제하시겠습니까?') ) {
      setIsRecorded(false);
      audioRef!.current!.removeAttribute('src');
    }
  }

  function clickSaveBtn() {
    if ( window.confirm('저장하시겠습니까?') ) {
      const newMeasureData = [ ...measureData ];
      const recording: string = audioRef!.current!.src;
      const index = getMeasureDataIndex(measureData, curMeasure.measure, curMeasure.staff);

      if ( index < 0 ) {
        newMeasureData.push({
          measure: curMeasure.measure,
          staff: curMeasure.staff,
          memo: '',
          recording,
          video: false
        });
      } else {
        newMeasureData[index] = { ...newMeasureData[index], recording };
      }
      
      setMeasureData(newMeasureData);
      setIsRecorded(false);
      onClose();
    }
  }
}