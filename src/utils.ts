export function repeat(strToRepeat: string, count: number) {
  count = Math.floor(count);
  if (strToRepeat.length == 0 || count == 0)
    return '';

  if (strToRepeat.length * count >= 1 << 28)
    throw new RangeError('repeat count must not overflow maximum string size');

  var maxCount = strToRepeat.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));
  while (count) {
    strToRepeat += strToRepeat;
    count--;
  }
  strToRepeat += strToRepeat.substring(0, maxCount - strToRepeat.length);
  return strToRepeat;
}