import React, { useState, useRef, useCallback } from 'react';
import ScoreDisplay from '@/components/score/ScoreDisplay';
import OSMDExtends from '@/lib/OSMDExtends';
import ScoreControllerContainer from './ScoreCcontrollerContainer';
import { useSetRecoilState } from 'recoil';
import { osmdAtom } from '@/store/score';

interface Props {
  control?: boolean; // 컨트롤러 포함 여부
  title?: boolean // 곡 제목 표시 여부
  subtitle?: boolean; // 곡 서브 제목 표시 여부
  file: string; // 파일 경로 또는 xml 파일 내용
  isChatOpen?: boolean;
}

export default function ScoreDisplayContainer({ control=false, title=false, subtitle=false, file, isChatOpen }: Props) {
  const setOsmd = useSetRecoilState(osmdAtom);
  const divRef = useRef<HTMLDivElement>(null);
  const loadScore = useCallback(() => {
    const options = {
      drawTitle: title,
      drawSubtitle: subtitle,
      autoResize: true,
    }

    const osmd = new OSMDExtends(divRef.current as HTMLElement, options);
    osmd.load(file).then(() => {
      osmd.render();
      
      // 사파리/파폭에서 전에 렌더링된 악보를 지워주지 않는 버그 대처
      if ( divRef.current ) {
        if ( divRef.current.querySelectorAll('#osmdCanvasPage1').length > 1 ) {
          divRef.current?.querySelector('#osmdCanvasPage1:first-child')?.remove();
      }
    }

      if ( control )
        setOsmd(osmd);
    });
  }, [isChatOpen]);

  const displayProps = { loadScore, divRef, isChatOpen };

  return (
    <>
      <ScoreDisplay { ...displayProps } />

      { control && 
        <ScoreControllerContainer />
      }
    </>
    
  )
}