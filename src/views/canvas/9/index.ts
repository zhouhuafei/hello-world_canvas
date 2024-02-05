import { CanvasDrawMain } from './utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor () {
    new CanvasDrawMain({
      mainBgAudioUrls: [
        // new URL('@/assets/audios/bgm0.mp3', import.meta.url).href,
        // new URL('@/assets/audios/bgm1.mp3', import.meta.url).href,
        // new URL('@/assets/audios/bgm2.mp3', import.meta.url).href,
        new URL('@/assets/audios/bgm3.mp3', import.meta.url).href
      ],
      mainTexts: [
        `你说你不赌博，可是你却买入了基金。`,
        `你说你不赌博，可是你却投资了股市。`,
        `你说你不赌博，可是你却背上了房贷。`
      ]
    })
  }
}

export { CanvasDrawPage }
