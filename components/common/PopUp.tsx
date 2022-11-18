import styles from '@/styles/common/PopUp.module.scss';
import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  children: any;
  show?: boolean;
  onClose?: Function;
}

export default function PopUp({ className, children, show=false, onClose=()=>{} }: Props) {
  return (
    <div className={`${styles.root} ${className} ${show ? styles.show:''}`}>
      <div className={styles.background} onClick={() => onClose()} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}