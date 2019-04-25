import "./index.less";
import "./lib/common";

import MenuButtons from "./components/MenuButtons";
import { arrayFromHTMLCollection } from "./lib/common";

window.onload = function () {
  const menuButtons: HTMLElement = document.querySelector(".js-menu-buttons"); 

  new MenuButtons(menuButtons);
}