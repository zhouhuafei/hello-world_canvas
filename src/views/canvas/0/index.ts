import { CanvasDrawMain } from './utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor (options: any = {}) {
    new CanvasDrawMain({
      ...options,
      mainBgImageUrl: new URL('./images/mainBg0.png', import.meta.url).href,
      mainBgAudioUrls: [
        new URL('@/assets/audios/bgm3.mp3', import.meta.url).href
      ],
      mainTexts: [
        `请保持心中的善良，因为你不知道，谁会借着你的善良，走出绝望`,
        `请保持你心中的信仰，因为你不知道谁会借着你的信仰，走出迷茫`
      ],
      maskBgImageUrls: [
        new URL('./images/maskBg0.png', import.meta.url).href,
        new URL('./images/maskBg1.png', import.meta.url).href
      ]
    })
  }
}

export { CanvasDrawPage }
