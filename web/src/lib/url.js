export const getUrlParam = (param) => {
    const url = new URL(window.location.href);
    if (url) {
      return url.searchParams.get(param);
    } else {
      return null;
    }
  }