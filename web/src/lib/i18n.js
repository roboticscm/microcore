import { derived, writable } from "svelte/store";
import { dev } from '$app/env';
import { AppStore } from "$src/store/app";
import { StringUtil } from "./string-util";

export const locale = writable(undefined);

let translation = AppStore.resources$.value;
export let locales = Object.keys(translation);

export const updateResource = () => {
  translation = AppStore.resources$.value;
  locales = Object.keys(translation);
}

const translate = (locale, key, vars) => {
  if (!key) {
    return '#Missing key';
  }
  if (!locale) {
    return formatKey(key);
  }

  key = StringUtil.normalizeKey(key)
  let text = translation[locale] && translation[locale][key];

  if (!text) {
    return formatKey(key);
  }

  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return (text ||'').removeExtraSpace();
}

const formatKey = (key) => {
  if (dev) {
    return key;
  } else {
    const keyParts = key.split('.');
    return '?' + keyParts[keyParts.length - 1].toTitleCase();
  }
}

export const t = derived(locale, (l) => (key, vars = {}) => {
  return translate(l || 'en', key, vars)
});


export const loadResource = async (fetch) => {
  const res = await fetch(`${import.meta.env.VITE_API_PREFIX}resource/find`)
  const data = await res.json();
  AppStore.resources$.next(data);
  updateResource();
  return;
};

export const fetchResource = async (fetch) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_PREFIX}resource/find`)
    return await res.json();
  } catch(err) {
    throw err
  }
};

export const applyResource = (data) => {
  AppStore.resources$.next(data);
  translation = data;
  locales = Object.keys(translation);
}