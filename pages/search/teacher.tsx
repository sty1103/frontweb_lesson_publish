import PageContent from '@/components/common/layout/PageContent';
import PageNav from '@/components/common/layout/PageNav';
import PageRoot from '@/components/common/layout/PageRoot';
import styles from '@/styles/search/SearchTeacher.module.scss';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  word: string;
}

const SearchTeacher: NextPage = () => {
  return (
    <PageRoot>
      <PageNav prevButton={true}>
        곡 <span>127</span>
      </PageNav>
      <PageContent>
        곡 검색 결과...
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