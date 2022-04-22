import { dev } from '$app/env';

export const isDebugMode = () => {
  return dev;
};

export const info = (...message) => {
  if (isDebugMode()) {
    console.log(...message);
  }
};

export const infoSection = (section, ...message) => {
  if (isDebugMode()) {
    console.log(`---------${section}--------`);
    console.log(...message);
  }
};

export const error = (...message) => {
  if (isDebugMode()) {
    console.error(...message);
  }
};

export const errorSection = (section, ...message) => {
  if (isDebugMode()) {
    console.error(`---------${section}--------`);
    console.error(message);
  }
};
