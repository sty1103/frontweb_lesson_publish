import styles from './TextToggleButton.module.scss';
import { forwardRef, useState } from 'react';

interface Props {
  className?: string;
  leftText: string;
  rightText: string;
}

const TextToggleButton = forwardRef<HTMLDivElement, Props>(({ className, leftText, rightText}, ref) => {
  const [ toggleState, setToggleState ] = useState<boolean>(false);

  return (
    <div
      className={`${styles.button} ${className} ${toggleState ? styles.active:''}`}
      onClick={() => setToggleState(!toggleState)}
    >
      <span>{leftText}</span>
      <span>{rightText}</span>
    </div>
  )
})

TextToggleButton.displayName = 'TextToggleButton';

export default TextToggleButton;