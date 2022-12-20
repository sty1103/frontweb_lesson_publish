import { useState, useRef } from 'react';
import styles from './HorizontalSlider.module.scss';

interface Props {
  children: any;
  className?: string;
  clientX: number;
  setClientX: Function;
}

export default function HorizontalSlider({ children, className, clientX, setClientX }: Props) {
  const itemWrapper = useRef<HTMLDivElement>(null);
  const [ isDown, setIsDown ] = useState<boolean>(false);
  const [ scrollLeft, setScrollLeft ] = useState<number>(0);

  return (
    <div className={`${styles.container} ${className}`}
        ref={itemWrapper}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {children}
    </div>
  )

  function handleMouseDown(e: React.MouseEvent) {
    setIsDown(true);
    setClientX(e.clientX);
    setScrollLeft(itemWrapper?.current!.scrollLeft);
    itemWrapper?.current!.classList.add(styles.active);
  }

  function handleMouseLeave(e: React.MouseEvent) {
    setIsDown(false);
    itemWrapper?.current!.classList.remove(styles.active);
  }

  function handleMouseUp(e: React.MouseEvent) {
    setIsDown(false);
    itemWrapper?.current!.classList.remove(styles.active);
  }

  function handleMouseMove(e: React.MouseEvent) {
    e.preventDefault();

    if( isDown ) {
      const x = e.pageX - itemWrapper?.current!.offsetLeft;
      const move = (x - clientX) * 3;

      itemWrapper!.current!.scrollLeft = scrollLeft - move;
    }
  }
}