export function cls(...args: (string | string[] | { [k: string]: any })[]): string {
  const classList = []
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (typeof arg === 'string') {
      classList.push(arg)
    } else if (Array.isArray(arg)) {
      classList.push(...cls(...arg).split(' '))
    } else if (typeof arg === 'object') {
      for (let k in arg) {
        if (arg[k]) {
          classList.push(k)
        }
      }
    }
  }
  return classList.join(' ').replace(/\s+/g, ' ').trim()
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function debounce<T extends (...args: Parameters<T>) => any>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timer = 0
  return function(...args: Parameters<T>) {
    clearTimeout(timer)
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(fn.apply(this, args))
      }, ms)
    })
  }
}

export function throttle<T extends (...args: Parameters<T>) => any>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => ReturnType<T> {
  let timer = 0
  return function(...args: Parameters<T>) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      timer = 0
    }, ms)
    return fn.apply(this, args)
  }
}
