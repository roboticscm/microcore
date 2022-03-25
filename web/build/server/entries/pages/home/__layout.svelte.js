import { c as create_ssr_component, e as escape, d as add_attribute, g as each, v as validate_component } from "../../../chunks/index-2396b2e2.js";
import "../../../chunks/string-65e3224b.js";
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeMenuId;
  let dropdownRef;
  const menuList = [
    {
      code: "menu1",
      icon: "",
      name: "sys.menu.menu1",
      path: "/about"
    },
    {
      code: "menu2",
      icon: "",
      name: "sys.menu.menu2",
      path: "/about"
    },
    { code: "separator" },
    {
      code: "menu3",
      icon: "",
      name: "sys.menu.menu3",
      path: "/about"
    },
    {
      code: "menu4",
      icon: "",
      name: "sys.menu.menu4",
      path: "/about"
    },
    {
      code: "menu5",
      icon: "",
      name: "sys.menu.menu5",
      path: "/about"
    }
  ];
  return `<div class="${"nav"}"><div class="${"nav__menu"}"><i class="${"fa fa-bars"}"></i></div>
	<div>Title</div>
	<div class="${"nav__avatar"}">${escape("username")}
		<img src="${"/images/logo.png"}" alt="${"Avt"}"></div></div>

<div class="${"dropdown"}"${add_attribute("this", dropdownRef, 0)}><div class="${"dropdown__header"}"><div class="${"dropdown__header__avatar"}">Avatr</div>
		<div class="${"dropdown__header__username"}">username</div></div>
	${menuList && Array.isArray(menuList) ? `${each(menuList, (menu) => {
    return `${menu.code === "separator" ? `<div class="${"dropdown__separator"}"><hr>
				</div>` : `<div class="${"dropdown__item " + escape(activeMenuId === menu.code ? "dropdown__item__active" : "")}"><div>Icon</div>
					<div><!-- HTML_TAG_START -->${menu.name}<!-- HTML_TAG_END --></div>
				</div>`}`;
  })}` : ``}</div>`;
});
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="${"main w-100 h-100"}"><section class="${"main__nav"}"><div class="${"main__nav__content h-100"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}</div></section>
    
    <section class="${"main__content"}">${slots.default ? slots.default({}) : ``}</section></main>`;
});
export { _layout as default };
