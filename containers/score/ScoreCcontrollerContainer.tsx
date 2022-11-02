import ScoreController from "@/components/score/ScoreController";
import OSMDExtends from "@/lib/OSMDExtends";
import { osmdAtom } from "@/store/score";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function ScoreControllerContainer() {
  const [ osmd, setOsmd ] = useRecoilState(osmdAtom);

  // 창 크기가 변경되면 악보의 크기가 자동으로 조절되는데, 컨트롤러의 사이즈도 악보에 맞춰서 다시 렌더를 해줘야 함
  let timeout: ReturnType<typeof setTimeout>;
  const renderController = () => {
    if ( timeout )
      clearTimeout(timeout);

    timeout = setTimeout(() => {
      if ( osmd ) {
        let newOsmd = Object.assign(Object.create(Object.getPrototypeOf(osmd)), osmd);
        setOsmd(newOsmd);
      }

      window.removeEventListener('resize', renderController);
    }, 400);
  }

  useEffect(()=>{
    window.addEventListener('resize', renderController);
  });

  return <ScoreController osmd={osmd} />;
}