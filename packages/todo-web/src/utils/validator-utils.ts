export function isFunction(val: any): val is (...args: any[]) => any {
  return typeof val === 'function'
}

export function isNil(val: any): val is (null | undefined) {
  return val == null
}
