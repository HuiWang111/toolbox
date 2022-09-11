export type RequiredKeys<T extends Record<string | symbol, unknown>, Keys extends keyof T> = {
  [P in Keys]-?: T[P];
} & Omit<T, Keys>;