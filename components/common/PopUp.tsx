import styles from '@/styles/common/PopUp.module.scss';
import { useEffect, useRef } from 'react';

interface Props {
  children: any;
  show?: boolean;
  onClose?: Function;
  className?: string
}

export default function PopUp({ children, show=false, onClose=()=>{}, className }: Props) {
  return (
    <div className={`${styles.popup} ${className} ${show ? styles.show:''}`}>
      <div className={styles.background} onClick={() => onClose()} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}