import { NextPage } from 'next';
import styles from './upload.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import router from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import SongItem, { ISongData } from '@/components/item/song/SongItem';
import PageRoot from '@/components/layout/page/PageRoot';
import PageHeader from '@/components/layout/page/PageHeader';
import PageContent from '@/components/layout/page/PageContent';
import ToggleButton from '@/components/button/toggle/ToggleButton';
import Button from '@/components/button/Button';
import PopUp from '@/components/popup/PopUp';

const PostUpload: NextPage = () => {
  const user = useRecoilValue(userAtom);
  const titleRef = useRef<HTMLInputElement>(null);
  const [ checkLesson, setCheckLesson ] = useState<boolean>(true);
  const [ checkPrivate, setCheckPrivate ] = useState<boolean>(false);
  const [ songPopup, setSongPopup ] = useState<boolean>(false);
  const searchSongRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // titleRef.current!.focus();
  })

  const songData: ISongData[] = [ ...Array(16) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <PageRoot className={styles.root}>
      <PageHeader prevButton={true}>
        게시글 업로드
      </PageHeader>
      <PageContent className={styles.content}>
        <div className={styles.subject}>
          <input type='text' placeholder='제목을 입력해주세요' ref={titleRef} />
        </div>

        <div className={styles.buttons}>
          { user?.type===0 &&
            <>
              <div className={styles.lesson} onClick={clickLesson}>
                <div className={styles.title}>
                  레슨 신청
                  <ToggleButton checked={checkLesson} disabled={true} />
                </div>
                <div className={styles.desc}>
                  공개적으로 레슨을 신청합니다
                </div>
              </div>

              <div className={styles.view} onClick={clickPrivate}>
                <div className={styles.title}>
                  비공개
                  <ToggleButton checked={checkPrivate} disabled={true} />
                </div>
                <div className={styles.desc}>
                  글을 비공개로 업로드합니다
                </div>
              </div>
            </>
          }

          <div className={styles.song} onClick={clickSearchSong}>
            <div className={styles.title}>
              곡 등록
            </div>
            <div className={styles.desc}>
              곡을 검색해 등록합니다
            </div>
          </div>

          <div className={styles.media} onClick={clickMedia}>
            <div className={styles.title}>
              미디어 업로드
            </div>
            <div className={styles.desc}>
              사진·영상을 업로드합니다
            </div>
            <input type='file' ref={fileRef} />
          </div>
        </div>

        <textarea placeholder='내용을 입력해주세요'>
        </textarea>
      </PageContent>

      <Button onClick={() => {}}>
        업로드
      </Button>

      <PopUp className={styles.songPopup} show={songPopup} onClose={closeSearchSong}>
        <div className={styles.top}>
          <input autoFocus={true} type='text' placeholder='검색어를 입력해주세요' ref={searchSongRef} />
          <BsSearch />
        </div>
        <div className={styles.middle}>
          {songData.map((v,k) => {
            return (
              <SongItem
                className={styles.item}
                onClickSong={clickSong}
                data={v}
                key={k}
              />
            )
          })}
        </div>
      </PopUp>
    </PageRoot>
  )

  function clickPrev() {
    router.back();
  }

  function clickLesson() {
    setCheckLesson(!checkLesson);
  }

  function clickPrivate() {
    setCheckPrivate(!checkPrivate);
  }

  function clickSearchSong() {
    setSongPopup(true);
    searchSongRef.current!.value = '';
    window.setTimeout(() => searchSongRef.current!.focus(), 0);
  }

  function clickSong(e: React.MouseEvent) {
    setSongPopup(false);
    searchSongRef.current!.value = '';
  }

  function closeSearchSong() {
    setSongPopup(false);
  }

  function clickMedia(){
    fileRef.current!.click();
  }
}

export default PostUpload;