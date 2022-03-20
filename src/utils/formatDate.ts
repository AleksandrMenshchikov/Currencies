export function formatDate(dateString: string) {
  const date = dateString.split('T')[0].split('-').reverse().join('.');
  const time = dateString.split('T')[1].split('+')[0];
  return `${date}, ${time}`;
}
