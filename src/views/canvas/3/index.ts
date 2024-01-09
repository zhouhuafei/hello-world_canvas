import { CanvasDrawMain } from '@/views/canvas/3/utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor (options: any = {}) {
    new CanvasDrawMain({
      ...options,
      mainBgImageUrl: new URL('./images/mainBg.png', import.meta.url).href,
      mainBgAudioUrl: new URL('./audios/mainBg.mp3', import.meta.url).href,
      mainTexts: [
        `你可以躲在角落选择沉默`,
        `但是不要嘲笑甚至诋毁比你勇敢的人`,
        `今日我若冷眼旁观`,
        `他日祸临己身`,
        `则无人为我摇旗呐喊`
      ],
      maskBg1ImageUrl: new URL('./images/maskBg1.png', import.meta.url).href,
      maskBg2ImageUrl: new URL('./images/maskBg2.png', import.meta.url).href,
      maskBg3ImageUrl: new URL('./images/maskBg3.png', import.meta.url).href,
      maskBg4ImageUrl: new URL('./images/maskBg4.png', import.meta.url).href,
      maskBg5ImageUrl: new URL('./images/maskBg5.png', import.meta.url).href
    })
  }
}

export { CanvasDrawPage }
