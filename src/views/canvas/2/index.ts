import { CanvasDrawMain } from '@/views/canvas/1/utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor (options: any = {}) {
    new CanvasDrawMain({
      ...options,
      mainBgImageUrl: new URL('./images/mainBg.png', import.meta.url).href,
      mainBgAudioUrl: new URL('./audios/mainBg.mp3', import.meta.url).href,
      mainTexts: [
        `宠妻者 风生水起`,
        `亏妻者 百财不入`
      ],
      maskBg1ImageUrl: new URL('./images/maskBg1.png', import.meta.url).href,
      maskBg2ImageUrl: new URL('./images/maskBg2.png', import.meta.url).href,
      maskBg3ImageUrl: new URL('./images/maskBg3.png', import.meta.url).href,
      maskBg4ImageUrl: new URL('./images/maskBg4.png', import.meta.url).href,
      maskBg5ImageUrl: new URL('./images/maskBg5.png', import.meta.url).href,
      maskBg6ImageUrl: new URL('./images/maskBg6.png', import.meta.url).href,
      maskBg7ImageUrl: new URL('./images/maskBg7.png', import.meta.url).href,
      maskBg8ImageUrl: new URL('./images/maskBg8.png', import.meta.url).href,
      maskBg9ImageUrl: new URL('./images/maskBg9.png', import.meta.url).href,
      maskBg10ImageUrl: new URL('./images/maskBg10.png', import.meta.url).href,
      maskBg11ImageUrl: new URL('./images/maskBg11.png', import.meta.url).href,
      maskNum: 11
    })
  }
}

export { CanvasDrawPage }
