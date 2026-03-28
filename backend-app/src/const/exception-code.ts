/** biome-ignore-all lint/style/useNamingConvention: <omit> */
const ExceptionCode = {
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  NOT_FOUND: 'NOT_FOUND',
  CONNECTED_RECORD: 'CONNECTED_RECORD',
} as const;

type ExceptionCodeType = keyof typeof ExceptionCode;

export { ExceptionCode };
export type { ExceptionCodeType };
