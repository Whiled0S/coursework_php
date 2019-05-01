import "./index.less";
import "./lib/common";

import PageWrapper from "./components/PageWrapper";
import MenuButtons from "./components/MenuButtons";

window.onload = function () {
  const overlay: Element = document.querySelector('#overlay');
  const pageWrapper: HTMLElement = document.querySelector('#page-wrapper');
  const menuButtons: HTMLElement = document.querySelector(".js-menu-buttons");

  overlay.classList.add('disabled');

  const wrapper: PageWrapper = new PageWrapper(pageWrapper);
  const buttons: MenuButtons = new MenuButtons(menuButtons, (index: number) => {
    wrapper.showPage(index);
  });

  // const formData: FormData = new FormData();
  // formData.append("name", "Имя");

  // fetch("http://localhost/coursework_php/backend/index.php", {
  //   method: "POST",
  //   body: formData
  // })
  //   .then(res => res.json())
  //   .then(data => console.log(data));
}