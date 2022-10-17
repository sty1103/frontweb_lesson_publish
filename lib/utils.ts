
export function nl2br(str: string): string {
  return str.replace(/\n/g, "<br />");
}