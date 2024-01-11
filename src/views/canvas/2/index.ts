import { CanvasDrawMain } from '@/views/canvas/1/utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor (options: any = {}) {
    new CanvasDrawMain({
      ...options,
      mainBgImageUrl: new URL('./images/mainBg.png', import.meta.url).href,
      mainBgAudioUrl: new URL('./audios/mainBg.mp3', import.meta.url).href,
      mainTexts: [
        `我们应该学着奋斗`,
        `学着努力`,
        `学着尝试新的事物`,
        `而不是旁观他人的成功`,
        `祝福他人的努力`,
        `与其临渊羡鱼`,
        `不如退而结网`
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
      maskNum: 10
    })
  }
}

export { CanvasDrawPage }
