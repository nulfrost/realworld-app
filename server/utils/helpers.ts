export const omit = (key: string, obj: Record<string, any>) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};
