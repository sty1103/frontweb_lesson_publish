import styles from '@/styles/search/SearchInput.module.scss';
import { forwardRef } from 'react';
import { BiSearch } from 'react-icons/bi';

interface Props {
  className?: string;
  onClick?: Function;
  onClickButton?: Function;
  onEnter?: Function;
  defaultValue?: string;
}

const SearchInput = forwardRef<HTMLInputElement, Props>(({ className, onClick=()=>{}, onClickButton=()=>{}, onEnter=()=>{}, defaultValue}, ref) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <input
        type='text'
        placeholder='검색어를 입력해주세요'
        defaultValue={defaultValue}
        onClick={() => onClick()}
        onKeyPress={(e) => onInputEnter(e)}
        ref={ref}
      />
      <BiSearch onClick={() => onClickButton()} />
  </div>
  )

  function onInputEnter(e: React.KeyboardEvent) {
    if ( e.key == 'Enter' ) {
      onEnter();
    }
  }
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;