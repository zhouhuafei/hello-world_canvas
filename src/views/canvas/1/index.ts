import { CanvasDrawMain } from '@/views/canvas/1/utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor () {
    new CanvasDrawMain({
      mainBgAudioUrls: [
        // new URL('@/assets/audios/bgm0.mp3', import.meta.url).href,
        // new URL('@/assets/audios/bgm1.mp3', import.meta.url).href,
        // new URL('@/assets/audios/bgm2.mp3', import.meta.url).href,
        new URL('@/assets/audios/bgm3.mp3', import.meta.url).href
      ]
    })
  }
}

export { CanvasDrawPage }
