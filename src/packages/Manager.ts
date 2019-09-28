const vocabulary: any = {
  confirm: {
    'zh-cn': '确认',
    'zh-sg': '确认',
    'zh-tw': '確認',
    'zh-hk': '確認',
    'en-us': 'confirm',
    'en': 'confirm'
  },
  cancel: {
    'zh-cn': '取消',
    'zh-sg': '取消',
    'zh-tw': '取消',
    'zh-hk': '取消',
    'en-us': 'cancel',
    'en': 'cancel'
  }
}

export default class UIManager {
  static language: string = navigator.language.toLowerCase();
  private static vocabulary: any = vocabulary;
  static getWord (key: string) {
    return this.vocabulary[key] && this.vocabulary[key][this.language];
  }
}

