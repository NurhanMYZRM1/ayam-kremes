/** Restaurant telephone numbers are Malaysian; preserve their local display form. */
export function telephoneUrl(value: string) {
  const number = value.replace(/[^\d+]/g, '');
  return `tel:${number.startsWith('0') ? `+60${number.slice(1)}` : number}`;
}
