import { CanvasDrawMain } from '@/views/canvas/1/utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor (options: any = {}) {
    new CanvasDrawMain({
      ...options,
      mainBgImageUrl: new URL('./images/mainBg.png', import.meta.url).href,
      mainBgAudioUrl: new URL('./audios/mainBg.mp3', import.meta.url).href,
      mainTexts: [
        `请保持心中的善良，因为你不知道，谁会借着你的善良，走出绝望`,
        `请保持你心中的信仰，因为你不知道谁会借着你的信仰，走出迷茫`
      ],
      maskBg1ImageUrl: new URL('./images/maskBg.png', import.meta.url).href,
      maskNum: 1
    })
  }
}

export { CanvasDrawPage }
