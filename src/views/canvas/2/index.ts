import { CanvasDrawMain } from '@/views/canvas/2/utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor () {
    new CanvasDrawMain({
      mainBgAudioUrl: new URL('./audios/mainBg.mp3', import.meta.url).href
    })
  }
}

export { CanvasDrawPage }
