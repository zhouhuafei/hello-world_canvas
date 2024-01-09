import { CanvasDrawMain } from '@/views/canvas/1/utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor (options: any = {}) {
    new CanvasDrawMain({
      ...options,
      mainBgImageUrl: new URL('./images/mainBg.png', import.meta.url).href,
      mainBgAudioUrl: new URL('./audios/mainBg.mp3', import.meta.url).href,
      mainTexts: [
        `能说服一个人的，从来不是道理，而是南墙`,
        `能点醒一个人的，从来不是说教，而是磨难`
      ],
      maskBg1ImageUrl: new URL('./images/maskBg.png', import.meta.url).href,
      maskNum: 1
    })
  }
}

export { CanvasDrawPage }
