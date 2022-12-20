import styles from './upload.module.scss';
import { NextPage } from 'next';
import { Form } from 'react-bootstrap';
import { BsFillCameraFill } from 'react-icons/bs';
import React, { useState } from 'react';
import PageRoot from '@/components/layout/page/PageRoot';
import PageHeader from '@/components/layout/page/PageHeader';
import PageContent from '@/components/layout/page/PageContent';
import Button from '@/components/button/Button';

const SongUpload: NextPage = () => {
  const [instrument, setInstrument] = useState<number>(0);
  const [genre, setGenre] = useState<number>(0);

  return (
    <PageRoot className={styles.root}>
      <PageHeader prevButton={true}>
        곡 업로드
      </PageHeader>
      <PageContent className={styles.content}>
        <div className={styles.title}>
          앨범아트
        </div>
        <div className={styles.albumart}>
          <div className={styles.img}>
            <BsFillCameraFill />
          </div>
          <div className={styles.form}>
            <Form.Control type='text' placeholder='곡 이름을 입력해주세요' />
            <Form.Control type='text' placeholder='작곡가 또는 가수 이름을 입력해주세요' />
            <Form.Control type='text' placeholder='곡의 길이(마디 수)를 입력해주세요' />
          </div>
        </div>

        <div className={styles.title}>
          악보 업로드
        </div>
        <div className={styles.score}>
          <div className={styles.notice}>
            <BsFillCameraFill />
            악보업로드
          </div>
          
        </div>

        <div className={styles.title}>
          악기
        </div>
        <div className={styles.selector}>
          {[...Array(10)].map((v,k) => {
            return (
              <span
                className={instrument===k ? styles.active:''}
                key={k}
                onClick={e => clickInstrument(e, k)}
              >피아노</span>
            )
          })}
        </div>

        <div className={styles.title}>
          장르
        </div>
        <div className={styles.selector}>
          {[...Array(10)].map((v,k) => {
              return (
                <span
                  className={genre===k ? styles.active:''}
                  key={k}
                  onClick={e => clickGenre(e, k)}
                >클래식</span>
              )
            })}
        </div>
      </PageContent>

      <Button className={styles.save} onClick={() => {}}>
        업로드
      </Button>
    </PageRoot>
  )

  function clickInstrument(e: React.MouseEvent, key: number) {
    setInstrument(key);
  }

  function clickGenre(e: React.MouseEvent, key: number) {
    setGenre(key);
  }
}

export default SongUpload;