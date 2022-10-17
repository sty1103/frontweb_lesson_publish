import styles from '@/styles/common/ErrorPage.module.scss';

export default function ErrorPage() {
  return (
    <section className={styles.error}>
      <div>404</div>
      잘못된 요청입니다
   </section>
  )
}