import { Message } from '../types';

export const omit = (key: string, obj: Record<string, any>) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};

// @ts-ignore
export const createServerError = (error) => {
  return {
    status: 500,
    title: Message.SERVER,
    description: `Error: ${error.message}`,
  };
};
