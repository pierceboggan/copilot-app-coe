declare module '@primer/octicons' {
  const octicons: Record<string, { toSVG: (options?: Record<string, unknown>) => string }>;
  export default octicons;
}
