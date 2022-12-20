import OSMDExtends from '@/modules/OSMDExtends';
import { atom, selector } from 'recoil';

export interface IMeasureData {
  measure: number; // 마디 번호
  staff: number; // 보표 번호
  memo: string; // 티칭 메모
  recording: string; // 녹음 데이터
  video: boolean; // 영상 삽입 여부
}

export interface ICurMeasure {
  measure: number;
  staff: number;
}

export const osmdAtom = atom<OSMDExtends | null>({
  key: `osmdAtom${new Date().getTime()}`,
  default: null,
  dangerouslyAllowMutability: true // 상태를 새로운 객체로 교체하지 않고 변경이 가능하도록 설정
});

export const linkedMeasureAtom = atom<number>({
  key: `linkedMeasureAtom${new Date().getTime()}`,
  default: -1
});

export const measureDataAtom = atom<IMeasureData[]>({
  key: `measureDataAtom${new Date().getTime()}`,
  default: []
});

export const curMeasureAtom = atom<ICurMeasure>({
  key: `curMeasureAtom${new Date().getTime()}`,
  default: { measure: -1, staff: -1 }
});