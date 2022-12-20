import router from 'next/router';

export function nl2br(str: string): string {
  return str.replace(/\n/g, "<br />");
}

export function moveUrl(url: string, scrollTop: boolean=true) {
  router.push(`${url}`, undefined, { scroll: false });

  if ( scrollTop ) {
    setTimeout(() => document.querySelector('main')?.scrollTo(0,0), 100)
  }
}