import type { PropType } from '@vue/runtime-core/dist/runtime-core'

type DefaultFactory<T> = (props: Record<string, unknown>) => T | null | undefined;

interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: D | DefaultFactory<D> | null | undefined | object;
  validator?(value: unknown): boolean;
}

export function genProp<T = any, D = T>(
  type: PropType<T> | true | null,
  Default?: D | DefaultFactory<D> | null | undefined | object,
  required = false,
  validator?: (value: unknown) => boolean
): PropOptions<T, D> {
  return {
    type,
    default: Default,
    required,
    validator
  }
}