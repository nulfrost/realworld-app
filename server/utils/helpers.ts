import { Message } from '../types';

export function omit(keys: string[], obj: Record<string, any>) {
  if (!keys.length) return obj;
  const { [keys.pop() as any]: omitted, ...rest } = obj;
  return omit(keys, rest);
}

// @ts-ignore
export const createServerError = (error) => {
  return {
    status: 500,
    title: Message.SERVER,
    description: `Error: ${error.message}`,
  };
};
