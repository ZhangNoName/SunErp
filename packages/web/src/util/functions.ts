/**
 * 防抖函数，delay之后执行fn
 * @param fn 执行的函数
 * @param delay 延迟多少执行
 * @returns
 */
export const Debounce = (fn: Function, delay: number) => {
  let timer: any = null;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
