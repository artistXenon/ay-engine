import './style.css'

import { Engine } from 'artistic-engine'


const canvas = document.querySelector<HTMLCanvasElement>('#main')!;
const engine = new Engine(canvas);

engine.start()

