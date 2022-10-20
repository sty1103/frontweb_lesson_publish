import router from 'next/router';

export function nl2br(str: string): string {
  return str.replace(/\n/g, "<br />");
}

export function moveUrl(url: string) {
  router.push(`${url}`, undefined, { scroll: false });
  document.querySelector('main')?.scrollTo(0,0);
}