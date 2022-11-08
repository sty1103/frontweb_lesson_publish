import styles from '@/styles/common/layout/PageNav.module.scss';
import { AiOutlineArrowLeft } from "react-icons/ai";
import router from 'next/router';

interface Props {
  className?: string;
  children?: any;
  prevButton?: boolean
}

export default function PageHeader({ className, children, prevButton }: Props) {
  return (
    <div className={`${styles.nav} ${className}`}>
      { prevButton===true && 
        <AiOutlineArrowLeft className={styles.prev} onClick={clickPrev}/>
      }
      <span>
        {children}
      </span>
    </div>
  )

  function clickPrev() {
    router.back();   
  }
}