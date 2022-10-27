import PageContent from '@/components/common/layout/PageContent';
import PageNav from '@/components/common/layout/PageNav';
import PageRoot from '@/components/common/layout/PageRoot';
import TextToggleButton from '@/components/common/TextToggleButton';
import TeacherBoxContainer from '@/containers/TeacherBoxContainer';
import { moveUrl } from '@/lib/utils';
import styles from '@/styles/search/SearchTeacher.module.scss';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  word: string;
}

const SearchTeacher: NextPage = () => {
  return (
    <PageRoot className={styles.root}>
      <PageNav className={styles.nav} prevButton={true}>
        <span>선생님</span>
        <span>31</span>
        <TextToggleButton 
          className={styles.toggle}
          leftText={'비대면'}
          rightText={'동네'}
        />
      </PageNav>
      <PageContent className={styles.content}>
        {[...Array(12)].map((v,k) => {
          return (
            <TeacherBoxContainer key={k} onClick={() => moveUrl('/profile/1a2b3c')} />
          )
        })}
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

export default SearchTeacher;