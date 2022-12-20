import styles from './ToggleButton.module.scss';

interface Props {
  className?: string;
  onClick?: Function;
  checked?: boolean;
  disabled?: boolean;
}

export default function ToggleButton({ className, onClick=()=>{}, checked=false, disabled=false }: Props) {
  return (
    <label
      className={`${styles.switch} ${className}`}
      onClick={() => onClick}
    >
      <input type='checkbox' checked={checked} disabled={disabled} />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  )
}