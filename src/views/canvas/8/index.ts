import { CanvasDrawMain } from './utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor () {
    new CanvasDrawMain({
      mainBgAudioUrls: [
        new URL('@/assets/audios/bgm3.mp3', import.meta.url).href
      ]
    })
  }
}

export { CanvasDrawPage }
