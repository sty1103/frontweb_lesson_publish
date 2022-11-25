import OSMDExtends from '@/lib/OSMDExtends';
import React, { useEffect } from 'react';

interface Props {
  loadScore: Function;
  divRef: React.RefObject<HTMLDivElement>;
  isChatOpen?: boolean;
}

export default function ScoreDisplay({ loadScore, divRef, isChatOpen }: Props) {
  useEffect(() => {
    loadScore();
  }, [loadScore]);

  useEffect(() => {
    // 모바일에서 주소창 크기에 변화가 생길 때 악보가 재렌더 되면서 스크롤에 영향을 미치는 것을 방지
    let width = window.innerWidth;
    window.addEventListener('resize', () => {
      if ( width === window.innerWidth ) return;
      width = window.innerWidth;
      setTimeout(() => {
        loadScore();
      }, 100);
    });
  })

  return (<div ref={divRef} />);
}