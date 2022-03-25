var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class App {
}
__publicField(App, "NAME", "Infinity");
__publicField(App, "AUTO_COMPLETE", "off");
__publicField(App, "SPACE_CODE", "&nbsp;");
__publicField(App, "SNACKBAR_TIMEOUT", 2e3);
class HtmlPrefixParser {
}
__publicField(HtmlPrefixParser, "REPEAT", "repeat_");
__publicField(HtmlPrefixParser, "MULTI", "multi_");
__publicField(HtmlPrefixParser, "REPEAT_MULTI", "repeatMulti_");
__publicField(HtmlPrefixParser, "READONLY", "#_");
__publicField(HtmlPrefixParser, "LINK", "link_");
__publicField(HtmlPrefixParser, "EACH_LOOP", "#each ");
__publicField(HtmlPrefixParser, "END_EACH_LOOP", "/each");
export { App as A, HtmlPrefixParser as H };
