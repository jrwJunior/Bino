import '../../components/works/works.pcss';

export default function tabs() {
  document.querySelector('.tab-list').addEventListener('click', handlerToogle);
}

const handlerToogle = evt => {
  const target = evt.target;
  
  if (target.parentNode.tagName === 'LI') {
    isActiveItem(target.parentNode);
    galleryPhoto(target.parentNode.dataset.id);
  }
}

const galleryPhoto = id => {
  Array.from(document.querySelector('.tile').children)
  .forEach(node => {
    if (id === 'all') {
      node.style = '';
      return;
    }

    isDisplay(node, id);
  });
}

const isDisplay = (node, id) => (
  node.style.display = !node.dataset.id.includes(id) ? 'none' : 'block'
);

const isActiveItem = (parent) => {
  Array.from(document.querySelector('.tab-list').children)
  .some(value => value.classList.contains('is-active') ? value.classList.remove('is-active') : null);

  parent.classList.add('is-active');
}