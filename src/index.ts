import "./index.less";
import "./lib/common";

import ImageUploadService from "./components/ImageUploadService";
import MessageService from "./components/MessageService";

window.onload = function () {
  const overlay: Element = document.querySelector("#overlay");
  const imageUploadForm: HTMLFormElement = document.querySelector("#image-upload-form");
  const messages: HTMLElement = document.querySelector('#messages');

  overlay.classList.add('disabled');

  new ImageUploadService(imageUploadForm);
  new MessageService(messages);
};