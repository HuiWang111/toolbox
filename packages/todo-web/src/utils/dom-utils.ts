export function createContainer(parentNode = document.body) {
  const container = document.createElement('div');
  parentNode.appendChild(container);
  return container;
}
