import { CanvasDrawMain } from './utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor () {
    new CanvasDrawMain({
      mainBgAudioUrls: [
        new URL('@/assets/audios/bgm1.mp3', import.meta.url).href
      ]
    })
  }
}

export { CanvasDrawPage }
