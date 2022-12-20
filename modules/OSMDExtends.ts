import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

interface IStaff {
  top: number;
  left: number;
  width: number;
  height: number;
}

type TMeasure = IStaff[];

export type TMeasures = TMeasure[];

// OSMD 확장 기능 구현
export default class OSMDExtends extends OpenSheetMusicDisplay {

  // HTML 상에서의 실제 마디 위치 계산
  getMeasurePosition() {
    const measures: TMeasures = [];
    // 마디 루프...
    this.GraphicSheet.MeasureList.forEach((staffs) => {
      const measure: TMeasure = [];
      // 보표 루프...
      staffs.forEach((staff) => {
        const top    = staff.PositionAndShape.AbsolutePosition.y * 10;
        const left   = staff.PositionAndShape.AbsolutePosition.x * 10;
        const width  = staff.PositionAndShape.Size.width * 10;
        const height = 41;

        measure.push({ top, left, width, height });
      });
      
      measures.push( measure );
    });

    return measures;
  }

}