import OSMDExtends from '@/lib/OSMDExtends';
import React, { useEffect, useRef } from 'react';

interface Props {
  loadScore: Function;
  isChatOpen?: boolean;
}

export default function ScoreDisplay({ loadScore, isChatOpen }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadScore(divRef);

    // 모바일에서 주소창 크기에 변화가 생길 때 악보가 재렌더 되면서 스크롤에 영향을 미치는 것을 방지
    let width = window.innerWidth;

    window.addEventListener('resize', () => {
      if ( width === window.innerWidth ) return;
      width = window.innerWidth;
      
      if ( divRef.current )
        loadScore(divRef);
    });
  }, [loadScore]);

  return (<div ref={divRef} />);
}