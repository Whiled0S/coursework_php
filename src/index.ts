import "./index.less";
import "./lib/common";

import PageWrapper from "./components/PageWrapper";
import MenuButtons from "./components/MenuButtons";
import ImageUploadService from "./components/ImageUploadService";
import MessageService from "./components/MessageService";
import {arrayFromHTMLCollection, arrayFromFileList} from "./lib/common";

window.onload = function () {
  const overlay: Element = document.querySelector("#overlay");
  const imageUploadForm: HTMLFormElement = document.querySelector("#image-upload-form");
  const imageUploadFormSubmit: HTMLElement = imageUploadForm.querySelector("#image-upload-form__submit");
  const messages: HTMLElement = document.querySelector('#messages');

  overlay.classList.add('disabled');

  new ImageUploadService(imageUploadForm);
  new MessageService(messages);
};