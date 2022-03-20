export function throttle(callee: any, timeout: any) {
  let timer: any;

  return function perform(...args: any[]) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
