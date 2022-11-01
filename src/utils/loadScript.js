export const loadScript = function (src, id, otherParams = {}, idToRender = "body") {
  if (document.querySelector(`#${id}`)) return;

  const tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  tag.id = id;
  const keys = Object.keys(otherParams);

  keys.forEach(key => tag.setAttribute(key, otherParams[key]));

  const renderInside = document.querySelector(`#${idToRender}`);
  renderInside.appendChild(tag);
};
