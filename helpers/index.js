export function tapLogger(i, timeArr, taps) {
  /* creates current timestamp */
  const currTime = new Date().getTime();
  /* adds timestamp to array */
  timeArr.push(currTime);
  /* if it's not the first timestamp */
  if (!i) {
    /* diff is 0 */
    taps.push({diff: 0});
    /* if not the first timestamp */
  } else {
    /* get previous timestamp */
    const prevTime = timeArr[i - 1];
    /* get previous diff */
    const prevDiff = taps[i - 1].diff;
    /* calculate current diff */
    const currDiff = currTime - prevTime;
    /* adds current diff to array, adding previous diff to pass in setTimeout*/
    taps.push({diff: prevDiff + currDiff});
  }
}
