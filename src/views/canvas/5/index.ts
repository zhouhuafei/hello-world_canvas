import { CanvasDrawMain } from './utils/CanvasDrawMain'

class CanvasDrawPage {
  constructor () {
    new CanvasDrawMain({
      mainBgAudioUrls: [
        new URL('@/assets/audios/bgm3.mp3', import.meta.url).href
      ],
      mainTexts: [
        `如果 商家把预制菜 改名为懒人菜 或者冷鲜菜 你会不会买`,
        `外围虹吸 小a新低 小a的JoJo被绿柱砸没了 所以小a没Jo了`
      ]
    })
  }
}

export { CanvasDrawPage }
