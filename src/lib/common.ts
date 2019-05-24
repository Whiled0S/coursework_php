export const arrayFromHTMLCollection = (collection: HTMLCollection):Array<Element> => {
  let array = new Array(0);

  for (let i = 0; i < collection.length; i++)
    array.push(collection.item(i));

  return array;
};

export const arrayFromFileList = (list: FileList):Array<File> => {
  let array = new Array(0);

  for (let i = 0; i < list.length; i++)
    array.push(list.item(i));

  return array;
};

export const parseStringToHtml = (htmlString: string): HTMLElement => {
  const parser: DOMParser = new DOMParser();
  const template: Document = parser.parseFromString(htmlString, "text/html");

  return template.querySelector('body').children.item(0) as HTMLElement;
};