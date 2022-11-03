import OSMDExtends from '@/lib/OSMDExtends';
import React, { useEffect } from 'react';

interface Props {
  loadScore: Function;
  divRef: React.RefObject<HTMLDivElement>;
  isChatOpen: boolean;
}

export default function ScoreDisplay({ loadScore, divRef, isChatOpen }: Props) {
  useEffect(() => {
    loadScore();
    console.log(1);
  }, [isChatOpen]);

  return (<div ref={divRef} />);
}