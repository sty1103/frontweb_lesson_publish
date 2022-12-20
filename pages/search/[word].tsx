import { userAtom } from '@/store/common';
import styles from './[word].module.scss';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import SongItem, { ISongData } from '@/components/item/song/SongItem';
import PageRoot from '@/components/layout/page/PageRoot';
import PageContent from '@/components/layout/page/PageContent';
import SearchInput from '@/components/input/search/SearchInput';
import { moveUrl } from '@/utils/common';
import TextToggleButton from '@/components/button/toggle/TextToggleButton';
import TeacherListItem from '@/components/item/teacher/TeacherListItem';

interface Props {
  word: string;
}

const SearchResult: NextPage<Props> = ({ word }) => {
  const user = useRecoilValue(userAtom);
  const songData: ISongData[] = [ ...Array(8) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <PageRoot className={styles.root}>
      <PageContent className={styles.content}>
        <SearchInput className={styles.input} defaultValue={word} />

        <div className={styles.title}>
          <div className={styles.link} onClick={() => moveUrl(`/search/song?word=${word}`)}>
            곡 <span>127</span> 
            <MdArrowForwardIos />
          </div>
        </div>
        <div className={styles.songs}>
          {songData.map((v,k) => {
            return (
              <SongItem
                className={styles.item}
                data={v}
                onClickSong={() => moveUrl('/song/1a2b3c')}
                key={k}
              />
            )
          })}
        </div>

        { user?.type===0 &&
          <>
            <div className={styles.title}>
              <div className={styles.link} onClick={() => moveUrl(`/search/teacher?word=${word}`)}>
                선생님 <span>31</span> 
                <MdArrowForwardIos />
              </div>

              <TextToggleButton 
                className={styles.face}
                leftText={'비대면'}
                rightText={'동네'}
              />
            </div>
            <div className={styles.teachers}>
              {[...Array(6)].map((v,k) => {
                return (
                  <TeacherListItem key={k} onClick={() => moveUrl('/profile/1a2b3c')} />
                )
              })}
            </div>
          </>
        }
      </PageContent>
    </PageRoot>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = {
    word: context.query.word
  }

  return {
    props
  }
}

export default SearchResult;