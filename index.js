var product_show_index = 0; //产品模块当前展示的的索引
var product_timer = null;//产品模块切换场景定时器
var product_progress_timer = null; //产品模块进度条定时器
var productLen = 0;
var playTime = 0;
var pauseTime = 0;
var product_progress_with = 0;
var pause_timer = null;
$(function () {
  // 页面进入动画
  document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.flyIn');
    console.log(sections)
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            section.classList.add('visible');
        }
    });
  })
  setTimeout(()=>{
    document.getElementById('serviceHd').classList.add('visible')
  },100)
  // 导航条置顶,背景颜色变化
  window.onscroll = function() {
      var navbar = document.getElementById('navbar');
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      var maxScroll = 500; // 定义最大滚动距离，超过这个距离透明度为1
      var opacity = Math.min(0.5, scrolled / maxScroll); // 计算透明度
      if(opacity<0.5){
        navbar.style.backgroundColor = `rgba(255,255,255,0.05)`; // 设置背景颜色和透明度
        navbar.style.boxShadow = 'none';
      }else{
        navbar.style.backgroundColor = `rgba(0,82,217, ${opacity})`; // 设置背景颜色和透明度
        navbar.style.boxShadow = `0px 8px 10px 0px rgba(0, 0, 0, 0.1)`;
      }
  };
  // 自动播放
  productAutoPlay();
  productLen = $('.screenshots .img-box img').length - 1;
  // 产品图片切换效果
   $('.product .nav-list li').hover(function (e) {
    var index = $(this).index();
    // 清除自动播放定时器
    clearInterval(product_timer);
    clearTimeout(pause_timer);
    pauseTime = playTime;
    if (product_show_index == index) {
      return false;
    } else {
      product_show_index = index;
      productPlay();
    }
  }, function () {
    // 重新打开自动播放定时器
    clearTimeout(pause_timer);
    if (pauseTime < 5000) {
      pause_timer = setTimeout(function () {
        product_show_index++;
        productPlay();
        productAutoPlay();
      }, 5000 - pauseTime)
    } else {
      productAutoPlay();
    }
  })
  // 案例
  const boxes = document.querySelectorAll('.case-item-li');
  boxes.forEach(box => {
      box.addEventListener('mouseover', () => {
          boxes.forEach(b => b.classList.remove('active'));
          box.classList.add('active');
      });
  });
  // 资讯
  const infos = document.querySelectorAll('.info-item-li');
  infos.forEach(box => {
      box.addEventListener('mouseover', () => {
          infos.forEach(b => b.classList.remove('active'));
          box.classList.add('active');
      });
  });
  //禁止拖动图片
  $('img').on('mousedown', function (e) {
    e.preventDefault();
  })
})

// 产品模块内容切换
function productPlay () {
  product_progress_with = 0;
  pauseTime = playTime = 0;
  if (product_show_index > productLen) {
    product_show_index = 0;
  }
  // 切换选中状态
  $('.product .nav-list li').eq(product_show_index).addClass('active').siblings().removeClass('active');
  //切换图片
  $('.screenshots .img-box .box').each(function () {
    $(this).find('img').eq(product_show_index).css({ 'z-index': 1, 'opacity': 1, 'transition-duration': '750ms' }).siblings().css({ 'z-index': 0, 'opacity': 0, 'transition-duration': '0ms' })
  })
}
// 产品模块内容自动切换
function productAutoPlay () {
  clearInterval(product_timer);
  product_timer = setInterval(function () {
    product_show_index++;
    if (product_show_index > 5) {
      product_show_index = 0;
    }
    productPlay();
  }, 5000)
}

