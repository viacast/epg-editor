// eslint-disable-next-line import/prefer-default-export
export function hasValue(data: unknown): boolean {
  return data !== undefined && data !== null && !Number.isNaN(data);
}
