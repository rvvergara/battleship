import mainGame from './mainGame';
import {
  humanBoardGrid,
  computerBoardGrid,
  container,
  mainrow,
  createGameEnv,
} from './dom/domUtils';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/main.css';

// const carrier = document.createElement('div');
// carrier.style = 'width: 430%; height: 100%; position: absolute; top: 0; left: 0; background: blue; opacity: 0.7; z-index: 500000';
// carrier.setAttribute('draggable', 'true');
// carrier.setAttribute('id', 'ship');
// carrier.setAttribute('ondragstart', "drag(event)");
// document.getElementById('h-0').appendChild(carrier);

// const frigate = document.createElement('div');
// frigate.style = 'width: 215%; height: 100%; position: absolute; top: 0; left: 0; background: blue; opacity: 0.7; z-index: 500000';
// frigate.setAttribute('draggable', 'true');
// frigate.setAttribute('id', 'frigate');
// frigate.setAttribute('ondragstart', "drag(event)");
// document.getElementById('h-20').appendChild(frigate);