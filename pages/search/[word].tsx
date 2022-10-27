import PageContent from '@/components/common/layout/PageContent';
import PageRoot from '@/components/common/layout/PageRoot';
import SearchInput from '@/components/search/SearchInput';
import styles from '@/styles/search/SearchResult.module.scss';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  word: string;
}

const SearchResult: NextPage<Props> = ({ word }) => {
  return (
    <PageRoot className={styles.root}>
      <PageContent className={styles.content}>
        <SearchInput />
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