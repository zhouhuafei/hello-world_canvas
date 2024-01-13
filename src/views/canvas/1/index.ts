import { CanvasDrawMain } from '@/views/canvas/1/utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor () {
    new CanvasDrawMain({
      mainBgAudioUrls: [
        new URL('./audios/bgm0.mp3', import.meta.url).href,
        new URL('./audios/bgm1.mp3', import.meta.url).href,
        new URL('./audios/bgm2.mp3', import.meta.url).href,
        new URL('./audios/bgm3.mp3', import.meta.url).href,
        new URL('./audios/bgm4.mp3', import.meta.url).href,
        new URL('./audios/bgm5.mp3', import.meta.url).href,
        new URL('./audios/bgm6.mp3', import.meta.url).href
      ]
    })
  }
}

export { CanvasDrawPage }
