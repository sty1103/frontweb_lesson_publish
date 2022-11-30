import styles from '@/styles/common/Toast.module.scss';
import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  show: boolean;
  setShow: Function;
  text?: string;
}

export default function Toast({ className, show=false, setShow=() => {}, text='' }: Props) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ( show===true ) {
      setTimeout(() => {
        toastRef.current?.classList.remove(styles.active);
        setShow(false);
      }, 800)
    }
  }, [show, setShow]);

  return (
    <div className={`${styles.root} ${className} ${show ? styles.active:''}`} ref={toastRef}>
      {text}
    </div>
  )
}