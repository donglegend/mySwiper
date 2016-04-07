# mySwiper
### 移动端全屏滑动的小插件，简单，轻便，好用，只有3k

#下载
-直接下载
-bower install mySwiper

#使用
支持amd和cmd规范

## 直接引入
```
<link rel="stylesheet" type="text/css" href="dist/swiper.css">
<script type="text/javascript" src="dist/swiper.js"></script>
<script type="text/javascript">
	var mySwiper = new Swiper(ops);
</script>
```
## require.js  和 sea.js 引入
## node环境引入

```
var Swiper = require("dist/swiper");
var mySwiper = new Swiper();
```


#参数
```
stage: ".stage", //容器，默认类名  .stage
page: ".page", //单页面, 默认类名  .page
direction: "vertical", //方向 vertical(默认)， horizontal
activeClass: "active", 
threshold: 50, // 翻页阈值，滑动的最小距离
duration: 300, // 页面过度 时间
elastic: 3 //弹性大小，值越大，滑动越不容易
```