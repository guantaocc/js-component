/**
 * 滚动行为
 */

/**
 * 是否平滑进行滚动
 */

function smoothScroll(element) {
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });
}
