import styles from '@/styles/posts/common/PostDetailNav.module.scss';
import { AiOutlineArrowLeft } from "react-icons/ai";
import router from 'next/router';

interface Props {
  className?: string;
  children?: any;
}

export default function PostDetailNav({ className, children }: Props) {
  return (
    <div className={`${styles.nav} ${className}`}>
      <AiOutlineArrowLeft className={styles.prev} onClick={clickPrev}/>
      <span>
        {children}
      </span>
    </div>
  )

  function clickPrev() {
    router.back();   
  }
}