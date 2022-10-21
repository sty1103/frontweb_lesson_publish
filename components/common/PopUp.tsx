import styles from '@/styles/common/PopUp.module.scss';
import { useEffect, useRef } from 'react';

interface Props {
  children: any;
  show?: boolean;
  onClose?: Function;
  className?: string
}

export default function PopUp({ children, show=false, onClose=()=>{}, className }: Props) {
  const popupRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${styles.popup} ${className} ${show ? styles.show:''}`} ref={popupRef}>
      <div className={styles.background} onClick={() => onClose()} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}