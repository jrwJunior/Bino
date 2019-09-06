import './styled-component/index.pcss';
import './components/header/header.pcss';
import './components/button/button.pcss';
import './components/advatenges/advanteges.pcss';
import './components/services/servics.pcss';
import './components/study/study.pcss';
import './components/statistic/statistic.pcss';
import './components/pricing/pricing.pcss';
import './components/integration/integration.pcss';
import './components/blog/blog.pcss';
import './components/feedback/feedback.pcss';
import './components/trial/trial.pcss';
import './components/footer/footer.pcss';

import Player from './components/history/Player';
import tabs from './components/works/work';
import menu from './components/header/menu';
import study from './components/study/study';
import Validator from './components/feedback/index';

new Player();
new Validator();
tabs(document.querySelector('.tile').children);

function requireAll(r) {
  r.keys().forEach(r);
}
menu();

requireAll(require.context('./sprite', false, /\.svg$/));
requireAll(require.context('./img', true,  /\.(png|jpe?g)$/));

window.addEventListener('load', () => {
  setTimeout(() => fadeOutnojquery(hellopreloader),1000);
});

const hellopreloader = document.getElementById("loader");
function fadeOutnojquery(el) {
  el.style.opacity = 1;
  const interhellopreloader = setInterval(() => {
    el.style.opacity = el.style.opacity - 0.05;
    if (el.style.opacity <= 0.05) { 
      clearInterval(interhellopreloader);
      hellopreloader.style.display = "none";
    }
  },16);
}
