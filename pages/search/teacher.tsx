import styles from './teacher.module.scss';
import { GetServerSideProps, NextPage } from 'next';
import PageRoot from '@/components/layout/page/PageRoot';
import PageHeader from '@/components/layout/page/PageHeader';
import TextToggleButton from '@/components/button/toggle/TextToggleButton';
import PageContent from '@/components/layout/page/PageContent';
import TeacherListItem from '@/components/item/teacher/TeacherListItem';
import { moveUrl } from '@/utils/common';

interface Props {
  word: string;
}

const SearchTeacher: NextPage = () => {
  return (
    <PageRoot className={styles.root}>
      <PageHeader className={styles.nav} prevButton={true}>
        <span>선생님</span>
        <span>31</span>
        <TextToggleButton 
          className={styles.toggle}
          leftText={'비대면'}
          rightText={'동네'}
        />
      </PageHeader>
      <PageContent className={styles.content}>
        {[...Array(12)].map((v,k) => {
          return (
            <TeacherListItem key={k} onClick={() => moveUrl('/profile/1a2b3c')} />
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