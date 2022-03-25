var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { n as noop, a as safe_not_equal, b as subscribe, r as run_all, i as is_function, c as create_ssr_component, d as add_attribute, e as escape, f as createEventDispatcher, v as validate_component } from "../../chunks/index-2396b2e2.js";
import { BehaviorSubject } from "rxjs";
import { S as StringUtil } from "../../chunks/string-util-529e6b84.js";
import "../../chunks/string-65e3224b.js";
import "uuid";
import "handlebars";
import "bowser";
import "moment";
import { A as App } from "../../chunks/constants-ea9bcd9b.js";
import "lodash";
import "json-parse-bigint";
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
class AppStore {
}
__publicField(AppStore, "resources$", new BehaviorSubject({}));
__publicField(AppStore, "notify$", new BehaviorSubject(void 0));
__publicField(AppStore, "locale$", new BehaviorSubject(void 0));
const locale = writable(void 0);
let translation = AppStore.resources$.value;
const updateResource = () => {
  translation = AppStore.resources$.value;
};
const translate = (locale2, key, vars) => {
  if (!key) {
    return "#Missing key";
  }
  if (!locale2) {
    return formatKey(key);
  }
  key = StringUtil.normalizeKey(key);
  let text = translation[locale2] && translation[locale2][key];
  if (!text) {
    return formatKey(key);
  }
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });
  return (text || "").removeExtraSpace();
};
const formatKey = (key) => {
  {
    const keyParts = key.split(".");
    return "?" + keyParts[keyParts.length - 1].toTitleCase();
  }
};
const t = derived(locale, (l) => (key, vars = {}) => {
  return translate(l, key, vars);
});
const loadResource = async (fetch) => {
  const res = await fetch("/api/resource/find");
  const data = await res.json();
  AppStore.resources$.next(data);
  updateResource();
};
var index_svelte_svelte_type_style_lang$2 = "";
class Errors {
  constructor() {
    this.errors = {};
  }
  has(field) {
    return this.errors.hasOwnProperty(field);
  }
  any() {
    return Object.keys(this.errors).length > 0;
  }
  get(field) {
    if (this.errors[field]) {
      return `${this.errors[field]}`;
    } else {
      return "";
    }
  }
  record(errors) {
    this.errors = errors;
    let firstError = Object.keys(this.errors)[0];
    if (firstError) {
      setTimeout(() => {
        const el = document.getElementsByName(firstError)[0];
        if (el) {
          el && el.focus();
        }
      }, 100);
    }
  }
  clear(field) {
    if (field) {
      delete this.errors[field];
      return;
    }
    this.errors = {};
  }
  clearAll() {
    this.errors = {};
  }
}
class Form {
  constructor(data, autoReset = true) {
    this.originalData = data;
    for (let field in data) {
      this[field] = data[field];
    }
    this.errors = new Errors();
    this.autoReset = autoReset;
  }
  data() {
    let data = {};
    for (let property in this.originalData) {
      data[property] = this[property];
    }
    return data;
  }
  reset() {
    if (this.autoReset) {
      for (let field in this.originalData) {
        if (typeof this[field] === "number") {
          if (field === "id") {
            this[field] = null;
          } else {
            this[field] = 0;
          }
        } else {
          this[field] = "";
        }
      }
    }
    this.errors.clearAll();
  }
  recordErrors(error) {
    if (error.field) {
      this.errors.record({ [error.field]: error.message });
    } else if (error.unknownError) {
      throw error;
    } else {
      this.errors.record(error);
    }
    return this.errors.errors;
  }
}
class GenericType {
  constructor() {
    this.id = void 0;
    this.disabled = false;
  }
}
class Partner extends GenericType {
  constructor(...args) {
    super(...args);
    this.username = "";
    this.password = "";
  }
}
const Snackbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let snackbarRef;
  let msg;
  const show = (_msg, timeout = App.SNACKBAR_TIMEOUT) => {
    msg = _msg;
    snackbarRef.classList.add("show-snackbar");
    setTimeout(() => {
    }, timeout);
  };
  const showSaveSuccess = (extraMsg = "") => {
    show($t("sys.msg.save success") + (StringUtil.isEmpty(extraMsg) ? "" : ". " + extraMsg));
  };
  const showLoginSuccess = (extraMsg = "") => {
    show($t("sys.msg.login success") + (StringUtil.isEmpty(extraMsg) ? "" : ". " + extraMsg));
  };
  const showCopySuccess = (extraMsg = "") => {
    show($t("sys.msg.copy success") + (StringUtil.isEmpty(extraMsg) ? "" : ". " + extraMsg));
  };
  const showDeleteSuccess = (extraMsg = "") => {
    show($t("sys.msg.delete success") + (StringUtil.isEmpty(extraMsg) ? "" : ". " + extraMsg));
  };
  const showUpdateSuccess = (extraMsg = "") => {
    show($t("sys.msg.update success") + (StringUtil.isEmpty(extraMsg) ? "" : ". " + extraMsg));
  };
  const showChangePasswordSuccessful = () => {
    show($t("sys.msg.change password successfull"));
  };
  const showUnknownError = (extraMsg = "") => {
    {
      show($t("sys.msg.unknown error"));
    }
  };
  const showTrashEmpty = (extraMsg = "") => {
    show($t("sys.msg.trash empty") + (StringUtil.isEmpty(extraMsg) ? "" : ". " + extraMsg));
  };
  const showTrashRestoreSuccess = (extraMsg = "") => {
    show($t("sys.msg.trash restore success") + (StringUtil.isEmpty(extraMsg) ? "" : ". " + extraMsg));
  };
  const showNoDataChange = () => {
    show($t("sys.msg.no data change"));
  };
  const showDuplicateData = () => {
    show($t("sys.msg.duplicate data"));
  };
  const noData = () => {
    show($t("sys.msg.no data update"));
  };
  const chooseOneCategory = () => {
    show($t("sys.msg.choose one category"));
  };
  const showNoDataSearchingFound = () => {
    show($t("sys.msg.no data searching found"));
  };
  const showMissingId = () => {
    show($t("sys.msg.your data seem to be misssing ID"));
  };
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.showSaveSuccess === void 0 && $$bindings.showSaveSuccess && showSaveSuccess !== void 0)
    $$bindings.showSaveSuccess(showSaveSuccess);
  if ($$props.showLoginSuccess === void 0 && $$bindings.showLoginSuccess && showLoginSuccess !== void 0)
    $$bindings.showLoginSuccess(showLoginSuccess);
  if ($$props.showCopySuccess === void 0 && $$bindings.showCopySuccess && showCopySuccess !== void 0)
    $$bindings.showCopySuccess(showCopySuccess);
  if ($$props.showDeleteSuccess === void 0 && $$bindings.showDeleteSuccess && showDeleteSuccess !== void 0)
    $$bindings.showDeleteSuccess(showDeleteSuccess);
  if ($$props.showUpdateSuccess === void 0 && $$bindings.showUpdateSuccess && showUpdateSuccess !== void 0)
    $$bindings.showUpdateSuccess(showUpdateSuccess);
  if ($$props.showChangePasswordSuccessful === void 0 && $$bindings.showChangePasswordSuccessful && showChangePasswordSuccessful !== void 0)
    $$bindings.showChangePasswordSuccessful(showChangePasswordSuccessful);
  if ($$props.showUnknownError === void 0 && $$bindings.showUnknownError && showUnknownError !== void 0)
    $$bindings.showUnknownError(showUnknownError);
  if ($$props.showTrashEmpty === void 0 && $$bindings.showTrashEmpty && showTrashEmpty !== void 0)
    $$bindings.showTrashEmpty(showTrashEmpty);
  if ($$props.showTrashRestoreSuccess === void 0 && $$bindings.showTrashRestoreSuccess && showTrashRestoreSuccess !== void 0)
    $$bindings.showTrashRestoreSuccess(showTrashRestoreSuccess);
  if ($$props.showNoDataChange === void 0 && $$bindings.showNoDataChange && showNoDataChange !== void 0)
    $$bindings.showNoDataChange(showNoDataChange);
  if ($$props.showDuplicateData === void 0 && $$bindings.showDuplicateData && showDuplicateData !== void 0)
    $$bindings.showDuplicateData(showDuplicateData);
  if ($$props.noData === void 0 && $$bindings.noData && noData !== void 0)
    $$bindings.noData(noData);
  if ($$props.chooseOneCategory === void 0 && $$bindings.chooseOneCategory && chooseOneCategory !== void 0)
    $$bindings.chooseOneCategory(chooseOneCategory);
  if ($$props.showNoDataSearchingFound === void 0 && $$bindings.showNoDataSearchingFound && showNoDataSearchingFound !== void 0)
    $$bindings.showNoDataSearchingFound(showNoDataSearchingFound);
  if ($$props.showMissingId === void 0 && $$bindings.showMissingId && showMissingId !== void 0)
    $$bindings.showMissingId(showMissingId);
  $$unsubscribe_t();
  return `<div class="${"snackbar"}"${add_attribute("this", snackbarRef, 0)}>${escape(msg)}</div>`;
});
var index_svelte_svelte_type_style_lang$1 = "";
const css = {
  code: '.login-background.svelte-1dlq0s9{background-image:url("/images/login-background.png");background-position:center;background-repeat:no-repeat;background-size:cover;opacity:0.9}.load-screen.svelte-1dlq0s9{background:#000;opacity:0.8;display:flex;justify-content:center;align-items:center;width:100%;height:100%;text-align:center}.loading.svelte-1dlq0s9{color:#fff;margin:0 auto}.login-title.svelte-1dlq0s9{display:block}.welcome.svelte-1dlq0s9{position:relative;display:flex;flex-direction:column;justify-content:center}.welcome.svelte-1dlq0s9::after{position:absolute;content:"";height:90%;width:2px;right:0;background:var(--border-light-color)}.logo.svelte-1dlq0s9{width:200px;height:200px}.container.svelte-1dlq0s9{overflow:auto;font-size:1.3rem;height:60%;width:70%;background-color:rgba(255, 255, 255, 0.99)}@media screen and (max-width: 1024px){.login-title.svelte-1dlq0s9{display:none}.welcome.svelte-1dlq0s9{justify-content:flex-start}.welcome.svelte-1dlq0s9::after{display:none}.logo.svelte-1dlq0s9{width:100px;height:100px}.container.svelte-1dlq0s9{height:80%;width:60%}}@media screen and (max-width: 768px){.login-title.svelte-1dlq0s9{display:none}.welcome.svelte-1dlq0s9{justify-content:flex-start}.logo.svelte-1dlq0s9{width:100px;height:100px}.container.svelte-1dlq0s9{height:100%;width:100%}}',
  map: null
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  createEventDispatcher();
  const resetForm = () => new Form(new Partner());
  resetForm();
  let snackbarRef;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Snackbar, "Snackbar").$$render($$result, { this: snackbarRef }, {
      this: ($$value) => {
        snackbarRef = $$value;
        $$settled = false;
      }
    }, {})}

${$$result.head += `${$$result.title = `<title>${escape($t("sys.label.login"))}</title>`, ""}`, ""}
${`<div class="${"load-screen svelte-1dlq0s9"}"><div class="${"loading svelte-1dlq0s9"}">Loading...</div></div>`}`;
  } while (!$$settled);
  $$unsubscribe_t();
  return $$rendered;
});
var index_svelte_svelte_type_style_lang = "";
const load = async ({ session, fetch }) => {
  const resourcePromise = loadResource(fetch);
  await Promise.all([resourcePromise]);
  return { status: 200, props: { loaded: true } };
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_locale;
  $$unsubscribe_locale = subscribe(locale, (value) => value);
  let { loaded = false } = $$props;
  if ($$props.loaded === void 0 && $$bindings.loaded && loaded !== void 0)
    $$bindings.loaded(loaded);
  $$unsubscribe_locale();
  return `${loaded ? `${`${validate_component(Login, "LoginForm").$$render($$result, {}, {}, {})}`}` : ``}
`;
});
export { Routes as default, load };
