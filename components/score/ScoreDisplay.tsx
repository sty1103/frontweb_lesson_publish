import OSMDExtends from '@/lib/OSMDExtends';
import React, { useEffect } from 'react';

interface Props {
  loadScore: Function;
  divRef: React.RefObject<HTMLDivElement>;
}

export default function ScoreDisplay({ loadScore, divRef }: Props) {
  useEffect(() => {
    loadScore();
  }, []);

  return (<div ref={divRef} />);
}