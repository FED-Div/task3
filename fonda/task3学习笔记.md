#Position布局
```html
<div class="wrapper">
	<div class="left"></div>
	<div class="main"></div>
	<div class="right"></div>
</div>
```
```css
// normalized...
// ...

// position布局
.wrapper {
	position: relative;

	// wrapper的高度必须要比left/right的高度高
	//height: 600px;
}
.left,
.right {
	position: absolute;
	top: 0;
	width: 200px;
}
.left {
	left: 0;
	background-color: #F00;
}
.right {
	right: 0;
	background-color: #0F0;
}
.main {
	margin: 0 210px;
	background-color: #00F;
}
```

上面那种方法是传统的绝对定位布局,简单粗暴,且这种布局不太会影响元素内部的布局。但若没有给wrapper设置``min-width``的话，``left``和``right``会因浏览器窗口变小，``main``的空间从有到无，然后两者就被重叠在一起了。

这里记录一下定位相关的知识点
####absolute
1. 包裹性
**包裹性**简单点说就是``inline-block``化,即当前元素若被设置成``absolute``后，则其默认100%显示的元素便会被设置成自适应内部元素的宽度。

2. 破坏性
**破坏性**换句话说就是指父元素塌陷，不同于``margin collapse``仅会造成高度塌陷, ``absolute``造成的塌陷会让其父元素**宽高**都塌掉(float仅会让高度塌陷)。

3. [z-index](http://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
被设置了``absolute``的子元素不存在文档流中，不管其``static``兄弟元素的``z-index``被设置成多大，都不会覆盖掉``absolute``元素，除非,``absolute``元素的``z-index``被设置成负值。


4. transform
如果含有overflow不为visible的父级元素，同时，该父级元素以及到该绝对定位元素之间任何嵌套元素都没有position为非static属性的声明，则overflow对该absolute元素不起作用。
这一个解释起来比较拗口，举个例子([转自张鑫旭博客](http://www.zhangxinxu.com/study/201505/css3-transform-overflow.html)):
```html```
<p><strong>图片自身transform</strong></p>
<div class="overflow">
    <img src="mm1.jpg" class="transform" />
</div>
<p><strong>overflow容器transform</strong></p>
<div class="overflow transform">
    <img src="mm1.jpg" />
</div>
<p><strong>overflow和图片之间内嵌元素transform</strong></p>
<div class="overflow">
    <div class="transform">
        <img src="mm1.jpg" />
    </div>
</div>
```
```css
.overflow { width: 191px; height: 191px; border: 2px solid #beceeb; overflow: hidden; }
.overflow img { position: absolute; }
.transform { -webkit-transform: scale(1); -ms-transform: scale(1); transform: scale(1); }
```


#Float布局
```html
<div class="left"></div>
<div class="right"></div>
<div class="content"></div>
```

```css
.left, .right {
	width: 100px;
	height: 100px;
}
.left {
	background-color: #F00;
	float: left;
}
.right {
	background-color: #0F0;
	float: right;
}
.content {
	background-color: #00F;
	height: 500px;
	margin: 0 200px;
}
```

知识点整理：

1、``float``是一个带有方向的``inline-block``属性，换句话来说，就是98%的``display:inline-block;float:left;``都不需要``display:inline-block;``，因为``float``会自动将其子元素包裹住。

2、``float``的元素会覆盖掉后面的兄弟``block``元素，且设置``z-index``无效。
(后来我才知道，专业点的解释应该从BFC特性的角度去解释，因为BFC不会与浮动的盒子叠加233...)
来个栗子:
```html
<div class="wrap">
	<div class="float">
		<!-- <img src="" alt=""> -->
	</div>
	<div class="block">
		<!-- <img src="" alt=""> -->
	</div>
</div>
```
```css
.wrap {
	width: 500px;
	height: 500px;
	boder: 1px solid #CCC;
}
.float, .block {
	width: 100px;
	height: 100px;
}
.float {
	float: left;
	background-color: #F00;
}
.block {
	background-color: #0F0;

	// 试着加上这个属性看看，(因为inline-block触发了BFC,等同于overflow:hidden...)
	// display: inline-block;
}
```
为什么加上了``inline-block``布局就不一样了呢？因为``float``设计的初衷就不是为了布局的，而是文字环绕。
但这里要注意一点，若``div``里面加个``img``元素，``img``彼此是不会重叠的，[因为图片是个实体，无法与同样实体且同一文档流的图片重合，所以这里的图片会像文字一样环绕周围。](http://www.zhangxinxu.com/wordpress/2010/01/css-float%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E3%80%81%E8%AF%A6%E8%A7%A3%E5%8F%8A%E6%8B%93%E5%B1%95%E4%BA%8C/)

3、清除浮动clearance
清除浮动有很多种方法，但各有优劣，选取那种方法得看项目取舍。

**IE下的清除浮动比较简单，触发元素的``haslayout``就可以了。如宽度值，高度值，绝对定位，zoom，浮动本身都可以让元素haslayout。显然，首选zoom:1;不会干扰任何样式。非IE浏览器则是触发[BFC](http://www.w3cplus.com/css/understanding-block-formatting-contexts-in-css.html),常用的是overflow属性，overflow:hidden;或是overflow:scroll都可以，不过由于后者经常一不小心出现滚动条，所以前者用的更多些。由于现代浏览器都支持after伪类伪元素，所以常常也会用after写入一个clear属性的元素清除浮动。当然，最投机取巧的方法就是直接一个``<div style="clear:both;"></div>``放到当作最后一个子标签放到父标签那儿。**

```css
.clearfix {
	overflow: hidden;
	zoom: 1;
}
<!-- ------------- -->
.clearfix {
	zoom: 1;
}
.clearfix:after,
.clearfix:before {
	display: block;
	content: '';
	line-height: 0;
	clear: both;
	visibility: hidden;
}
```
4、关于BFC

> 浮动，绝对定位元素，inline-blocks, table-cells, table-captions,和overflow的值不为visible的元素，（除了这个值已经被传到了视口的时候）将创建一个新的块级格式化上下文。

> 一个BFC是一个HTML盒子并且至少满足下列条件中的任何一个：

  - float的值不为none
  - position的值不为static或者relative
  - display的值为 table-cell, table-caption, inline-block, flex, 或者 inline-flex中的其中一个
  - overflow的值不为visible

  1. 使用BFC来防止外边距折叠
  > 毗邻块盒子的垂直外边距折叠只有他们是在同一BFC时才会发生。如果他们属于不同的BFC，他们之间的外边距将不会折叠。所以通过创建一个新的BFC我们可以防止外边距折叠。

  2. 使用BFC来包含浮动
  > [浮动元素会脱离line boxes](http://www.zhangxinxu.com/wordpress/2010/01/css-float%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E3%80%81%E8%AF%A6%E8%A7%A3%E5%8F%8A%E6%8B%93%E5%B1%95%E4%B8%80/),因为这个原因，导致元素没有高度，也就无法撑高父元素。而我们通常会使用``clear:both``来清除浮动带来的高度塌陷,但其实我们也可以用BFC。

#负margin布局
负margin布局即是传说中的双飞翼布局。
```html
<div class="marginWrap">
	<div class="content"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```

```css
.marginWrap {
	width: 100%;
	float: left;
}
.left, .right {
	width: 180px;
	height: 500px;
	background-color: #F00;
}
.content {
	margin: 0 200px;
	height: 500px;
	background-color: #0F0;
}
.left {
	margin-left: -100%;
	float: left;
}
.right {
	margin-left: -180px;
	float: left;
}
```

注意:

1. 盒子最后的显示大小等于盒子的border+padding+正margin，而负margin不会影响其大小。

2. margin-left、top不论正负**元素自己**动，right、bottom不论正负**别的元素**动。

扩展资料：

[Web布局连载——两栏固定布局（一）](http://www.w3cplus.com/css/layout/fixed-layout/two-columns-1.html)

[Web布局连载——两栏固定布局（二）](http://www.w3cplus.com/css/layout/fixed-layout/two-columns-2.html)

[Web布局连载——两栏固定布局（三）](http://www.w3cplus.com/css/layout/fixed-layout/two-columns-3.html)



#Flexbox布局
```html
<div class="wrap">
	<div class="content"></div>
	<div class="left"></div>
	<div class="right"></div>
</div>
```

```css
.wrap {
	display: flex;
}
.left, .right, .content {
	height: 500px;
}
.left {
	width: 200px;
	order: 1;
	background-color: #F00;
}
.content {
	flex: 1;
	order: 2;
	background-color: #0F0;
}
.right {
	width: 200px;
	order: 3;
	background-color: #00F;
}
```

参考资料：

[阮一峰 - Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[阮一峰 - Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

[A grid system based on the flex display property(source)](http://flexboxgrid.com/)

[CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/2016/CR-css-flexbox-1-20160301/)

[w3cplus Flex系列](http://www.w3cplus.com/blog/tags/157.html)

[Flexbox在微信浏览器上有非常多的坑, 这里有一个小归纳，可以参考一下2016-3-17](http://www.w3cfuns.com/notes/20813/64e2da2a02eddc2622a861b5c9e8f430.html)