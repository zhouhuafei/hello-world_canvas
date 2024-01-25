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
        `请帮忙给 这个效果 取个名字 第02期`,
        `取名为 《黑客效果》 怎么样？`
      ]
    })
  }
}

export { CanvasDrawPage }
