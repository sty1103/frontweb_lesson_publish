import PageContent from '@/components/common/layout/PageContent';
import PageRoot from '@/components/common/layout/PageRoot';
import TextToggleButton from '@/components/common/TextToggleButton';
import SearchInput from '@/components/search/SearchInput';
import SongsContainer, { IData } from '@/containers/songs/SongContainer';
import TeacherBoxContainer from '@/containers/TeacherBoxContainer';
import { moveUrl } from '@/lib/utils';
import styles from '@/styles/search/SearchResult.module.scss';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

interface Props {
  word: string;
}

const SearchResult: NextPage<Props> = ({ word }) => {
  const songData: IData[] = [ ...Array(8) ];
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
          <SongsContainer data={songData} onClickSong={() => moveUrl('/song/1a2b3c')} />
        </div>

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
              <TeacherBoxContainer key={k} onClick={() => moveUrl('/profile/1a2b3c')} />
            )
          })}
        </div>
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