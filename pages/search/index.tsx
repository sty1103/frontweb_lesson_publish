import PageContent from '@/components/common/layout/PageContent';
import PageRoot from '@/components/common/layout/PageRoot';
import SearchInput from '@/components/search/SearchInput';
import { moveUrl } from '@/lib/utils';
import styles from '@/styles/search/Search.module.scss';
import { NextPage } from "next";
import Image from "next/legacy/image";
import { IoMdMusicalNote } from 'react-icons/io';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';


const Search: NextPage = () => {
  const user = useRecoilValue(userAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <PageRoot className={styles.root}>
      <PageContent className={styles.content}>
        <SearchInput
          className={styles.input}
          onEnter={onSearch}
          onClickButton={onSearch}
          ref={inputRef}
        />

        <div className={styles.title}>
          지금 뜨는 곡
        </div>
        <div className={styles.hot}>
          <div className={styles.wrapper}>
            {[...Array(7)].map((v,k) => {
              return (
                <span key={k} onClick={()=>moveUrl('/song/1a2b3c')}>
                  <IoMdMusicalNote />
                  성시경 - 너의 모든 순간
                </span>
              )
            })}
          </div>
        </div>

        { user?.type===0 &&
          <>
            <div className={styles.title}>
              추천 선생님
              </div>
              <div className={styles.teacher}>
                <div className={styles.subtitle}>
                  비대면
                </div>
                <div className={styles.wrapper}>
                  {[...Array(4)].map((v,k) => {
                    return (
                      <div
                        className={styles.item}
                        key={k}
                        onClick={() => moveUrl('/profile/1a2b3c')}
                      >
                        <div className={styles.img}>
                          {/* <Image /> */}
                        </div>
                        <div className={styles.name}>
                          김도우
                        </div>
                        <div className={styles.career}>
                          바이올린 과외 8년차
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className={styles.teacher}>
                <div className={styles.subtitle}>
                  내 동네
                </div>
                <div className={styles.wrapper}>
                  {[...Array(4)].map((v,k) => {
                    return (
                      <div
                        className={styles.item}
                        key={k}
                        onClick={() => moveUrl('/profile/1a2b3c')}
                      >
                        <div className={styles.img}>
                          {/* <Image /> */}
                        </div>
                        <div className={styles.name}>
                          김도우
                        </div>
                        <div className={styles.career}>
                          바이올린 과외 8년차
                        </div>
                      </div>
                    )
                  })}
                </div>
            </div>
          </>
        }
        
      </PageContent>
    </PageRoot>
  )

  function onSearch() {
    moveUrl(`/search/${inputRef.current!.value}`);
  }
}

export default Search;