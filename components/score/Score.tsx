import OSMDExtends from '@/modules/OSMDExtends';
import { osmdAtom } from '@/store/score';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import ScoreControlPannel from '@/components/score/ScoreControlPannel';

interface Props {
  control?: boolean; // 컨트롤러 포함 여부
  title?: boolean // 곡 제목 표시 여부
  subtitle?: boolean; // 곡 서브 제목 표시 여부
  file: string; // 파일 경로 또는 xml 파일 내용
  isChatOpen?: boolean;
}

export default function Score({ control=false, title=false, subtitle=false, file, isChatOpen }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const setOsmd = useSetRecoilState(osmdAtom);

  const loadScore = useCallback((divRef: React.RefObject<HTMLDivElement>) => {
    const options = {
      drawTitle: title,
      drawSubtitle: subtitle,
      autoResize: false,
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

  return (
    <>
      <div ref={divRef} />
      { control && 
        <ScoreControlPannel />
      }
    </>
  );
}