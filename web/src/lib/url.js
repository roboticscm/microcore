export const getUrlParam = (param) => {
  const url = new URL(window.location.href);
  if (url) {
    return url.searchParams.get(param);
  } else {
    return null;
  }
}

export const getTitle = (title) => {
  return import.meta.env.VITE_APP_NAME + ' - ' + title
}


export const getMenuPathFromUrl = () => {
  return window.location.pathname;
}