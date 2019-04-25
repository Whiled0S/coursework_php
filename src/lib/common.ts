export const arrayFromHTMLCollection = (collection: HTMLCollection):Array<Element> => {
  let array = new Array(0);

  for (let i = 0; i < collection.length; i++)
    array.push(collection.item(i));

  return array;
}