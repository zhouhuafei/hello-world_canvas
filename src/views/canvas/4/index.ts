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
        `focus blur scroll 不支持事件冒泡 支持事件捕获`,
        `给元素设置 class="ad" 会被浏览器 当做广告屏蔽`
      ]
    })
  }
}

export { CanvasDrawPage }
