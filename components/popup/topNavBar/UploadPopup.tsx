import { moveUrl } from '@/utils/common';
import styles from './UploadPopup.module.scss';
import { BsMusicNoteList } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import PopUp from '@/components/popup/PopUp';

interface Props {
  className?: string;
  onClose?: Function;
  show: boolean;
}

export default function UploadPopup({ className, onClose=()=>{}, show }: Props) {
  return (
    <PopUp
      className={`${styles.root} ${className}`}
      onClose={onClose}
      show={show}
    >
      <div className={styles.content}>
        <div className={styles.song} onClick={clickSong}>
          <FaMusic />
          곡 업로드
        </div>
        <div className={styles.post} onClick={clickPost}>
          <BsMusicNoteList />
          게시글 업로드
        </div>
      </div>
    </PopUp>
  )

  function clickSong(){
    onClose();
    moveUrl('/song/upload');
  }

  function clickPost() {
    onClose();
    moveUrl('/post/upload');
  }
}