import { useRef, useEffect } from "react";
import styles from '@/styles/common/KaKaoMap.module.scss';

interface Props {
  loadMap: Function;
  dong: string;
  isError: boolean;
}

export default function KakaoMap({ loadMap, dong, isError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMap(containerRef);
  }, [loadMap]);

  return (
    <>
      <div className={`${styles.map} ${isError ? styles.error:''}`} ref={containerRef} />
      <div className={`${styles.sub} ${isError ? styles.error:''}`}>
        {isError ? '현재 위치를 가져오는 데 문제가 발생했습니다. 위치 권한을 확인하시고 다시 시도하시거나 고객센터로 문의해주시기 바랍니다.':dong}
      </div>
    </>
  )
}