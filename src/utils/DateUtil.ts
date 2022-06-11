/**
 * 格式化为UTC时区的字符串
 * @param date 时间
 */
export function toUTCString(date: Date) {
  const y = date.getUTCFullYear();
  const m = `0${date.getUTCMonth() + 1}`.slice(-2);
  const d = `0${date.getUTCDate()}`.slice(-2);
  const h = `0${date.getUTCHours()}`.slice(-2);
  const minutes = `0${date.getUTCMinutes()}`.slice(-2);
  const seconds = `0${date.getUTCSeconds()}`.slice(-2);
  const mill = `00${date.getUTCMilliseconds()}`.slice(-3);
  return `${y}-${m}-${d}T${h}:${minutes}:${seconds}.${mill}Z`;
}
