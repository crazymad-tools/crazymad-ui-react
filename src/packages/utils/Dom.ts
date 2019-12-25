export default class Dom {

  static getOffsetDistance(dom: any): { offsetLeft: number, offsetTop: number, height: number, width: number } {
    let parent = dom;
    let offsetLeft = 0;
    let offsetTop = 0;
    let width = dom && dom.offsetWidth;
    let height = dom && dom.offsetHeight;
    while (parent) {
      offsetLeft += parent.offsetLeft;
      offsetTop += parent.offsetTop;
      parent = parent.offsetParent;
    }

    return {
      offsetLeft,
      offsetTop,
      height,
      width
    }
  }

}