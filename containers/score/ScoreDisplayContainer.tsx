import React, { useState, useRef } from 'react';
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
}

export default function ScoreDisplayContainer({ control=false, title=false, subtitle=false, file }: Props) {
  const setOsmd = useSetRecoilState(osmdAtom);

  const divRef = useRef<HTMLDivElement>(null);

  const loadScore = () => {
    const options = {
      drawTitle: title,
      drawSubtitle: subtitle,
      autoResize: true,
    }

    const osmd = new OSMDExtends(divRef.current as HTMLElement, options);
    osmd.load(file).then(() => {
      osmd.render();

      if ( control )
        setOsmd(osmd);
    });
  };

  const displayProps = { loadScore, divRef };

  return (
    <>
      <ScoreDisplay { ...displayProps } />

      { control && 
        <ScoreControllerContainer />
      }
    </>
    
  )
}