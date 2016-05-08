### 弹性盒子的概念 （Flexible boxes）

Flex = Flexible Box 意为弹性布局，用于盒装模型的布局。(CSS3 Flexible Box => flexbox)

flexbox容器下的子元素可以向任意方向布局(垂直对齐，水平对齐，各方向居中等都可以轻松实现)，并且拥有弹性的宽度来适配屏幕空间。

flex布局产生的目的就是为了解决这样一个问题：能够改变子元素的宽或者(和)高，实现在任意设备上都能利用可用的空间来完美的显示内容。 

flex容器就能做到，它可以拓展其子元素(增加宽/高)来利用填补多余的空间， 或者缩小子元素的尺寸来避免内容溢出(overflow)。

这一点类似于网格布局(或称栅格布局)，都能用来实现响应式布局，但是两者还是有区别的。网格布局适用于整体的缩放布局(响应式)，而flex布局适用于小范围或者某些组件上使用。

### 跨浏览器兼容性

![flex浏览器兼容性](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071003.jpg)

### 与其相关的CSS属性一览

`flex`

`align-content` `align-items` `align-self` 

`flex-basis` `flex-direction` `flex-flow` `flex-grow` `flex-shrink` `flex-wrap`

`justify-content` `order`


### 相关名词解释

图中最大的一个盒子作为 `flex容器` , 简称“容器”。其子元素称为`项目`(item)。

![flex布局位置概念](https://developer.mozilla.org/files/3739/flex_terms.png)

flex容器中存在水平主轴`main axis` 和 垂直的纵轴`cross axis`。容器中有多少行子元素就有多少主轴。

水平主轴从容器的左边框起 (该点称为 `main start`)，结束于容器的右边框 (该点称为 `main end`)。

垂直纵轴起始于容器上边框 (该点称为`cross start`)，终止与容器下边框 (该点称为 `cross end`)。


### flex容器属性

共六个属性可以在容器上设置

1. flex-direction
2. flex-wrap
3. flex-flow
4. justify-content
5. align-items
6. align-content

#### 1. flex-direction 

设定主轴方向，即子元素(项目)的排列方向。

| 可选值  |     row      | row-reverse |  column  | column-reverse |
| :--: | :----------: | :---------: | :------: | :------------: |
|  解释  | 主轴方向从左至右(默认) |  主轴方向从右至左   | 主轴方向从上至下 |    主轴方向从下至上    |

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)

再次声明：主轴方向确定items(子元素)的排列方向。

#### 2. flex-wrap

设定换行规则 (当内容超出屏幕一行能显示的范围时，如何显示）

| 可选值  |                  nowrap                  |                   wrap                   |               wrap-reverse               |
| :--: | :--------------------------------------: | :--------------------------------------: | :--------------------------------------: |
|  解释  |    不换行(默认)，这将改变所有子元素的尺寸以实现所有子元素在一行显示     |             换行，多出的内容移至下一行显示              |             换行，多出的内容移至上一行显示              |
|      | ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png) | ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg) | ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg) |

#### 3. flex-content

flex-content是 flex-direction 和 flex-wrap 的简写形式。

flex-content: <flex-direction> || <flex-wrap> ;

#### 4. justify-content 

设定子元素在主轴上的对齐方式，就这一个属性就可以轻松实现垂直居中 :halloween:

| 可选值  | flex-start | flex-end | center | space-between |  space-around  |
| :--: | :--------: | :------: | :----: | :-----------: | :------------: |
| 解释*1 |    左对齐     |   右对齐    |   居中   |     两端对齐      | 每个子元素两侧的间隔相同*3 |
| 解释*2 |  向主轴起点对齐   | 向主轴终点对齐  |   同上   |      同上       |       同上       |

*1：flex-direction为默认值情况下

*2：一般情况下

*3：子元素间的间隔比子元素到容器的间隔大一倍

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)

#### 5. align-items

设定子元素在垂直纵轴上的对齐方式

| 可选值  | flex-start | flex-end   | center | baseline       | stretch       |
| ---- | ---------- | ---------- | ------ | -------------- | ------------- |
| 解释   | 向垂直纵轴的起点对齐 | 向垂直纵轴的终点对齐 | 居中     | 按子元素第一行文字的基线对齐 | 占满容器高度*1(默认值) |

*1： 在子元素高度未设置或设置为默认值auto时有效

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png)

#### 6.align-content

当有多根主轴时，设定其对齐方式。只有一根主轴时该属性无效。

| 属性值  | flex-start             | flex-end       | center    | space-between | space-around    | stretch     |
| ---- | ---------------------- | -------------- | --------- | ------------- | --------------- | ----------- |
| 解释   | 从垂直纵轴起点开始向终点排列(一行一行的排) | 从垂直纵轴终点开始向起点排列 | 与垂直纵轴中点对齐 | 与垂直纵轴两端对齐     | 每个纵轴线(行)之间的间隔相等 | 默认值，所有行占满容器 |

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)

### 子元素的属性

1. order
2. flex-grow
3. flex-shrink
4. flex-basis
5. flex
6. align-self

#### 1. order

定义子元素的排列优先级，数值越小，位置越靠前。(默认为0，允许负值)



#### 2. flex-grow

定义子元素的放大比例，默认为0。



#### 3. flex-shrink

定义子元素的缩小比例，默认为1。不能为负。



#### 4. flex-basis

设定子元素的为固定宽度， 默认值 auto。



#### 5. flex

flex是 flex-grow ，flex-shrink， flex-basis的间写形式。默认值 0 1 auto，后面两个属性可选填。

```css
flex：none | [ <flex-grow>  <flex-shrink>? || <flex-basis> ]
```



#### 6. align-self

设定单个子元素与其他子元素不同的对齐方式，可覆盖align-items的值。默认值 auto。

```CSS
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

其值对应的效果与 align-items 的效果一致。



##### 参考链接

> [Using CSS flexible boxes MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
>
> [align-content MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)
>
> [Flex布局教程-阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)