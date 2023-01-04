export const capitalize = (s: string) =>
  s.length > 0 ? `${s.charAt(0).toUpperCase()}${s.substring(1)}` : '';
