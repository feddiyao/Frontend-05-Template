@[TOC](CSS学习笔记)
# CSS总论
## CSS2.1语法
css2.1语法文档：[https://www.w3.org/TR/CSS21/grammar.html#q25.0](https://www.w3.org/TR/CSS21/grammar.html#q25.0)
看下第一条产生式：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201220190828292.png)
在这里 charset就是@charset的结构。
然后允许出现若干个import，它一定在charset之后，但是在其他的规则之前。
接下来支持一个长列表，这个长列表里面有三种结构：ruleset、media和page，其他的都是空白符号。
ruleset 就是普通的css规则
media就是media标签
page主要用于打印的信息
CDO、CDC是html注释的起点和止点，这可以理解为一个历史包袱，早年的CSS为了支持HTML里面不要把CSS的文本显示出来，所以允许你在这个地方用HTML注释把CSS的内容变成HTML注释，这样旧的浏览器就可以把CSS理解成HTML注释而新的浏览器就可以把CSS文本理解成CSS规则。
综上CSS2.1的主要结构如下：
@charset
@import
rules
- @media
- @page
- rule

注意：CSS3的rule和这个相比可能会有一些变化，但是总体结构应该是不会改变了
## @规则
• @charset ： https://www.w3.org/TR/css-syntax-3/
• @import ：https://www.w3.org/TR/css-cascade-4/
• @media ：https://www.w3.org/TR/css3-conditional/
• @page ： https://www.w3.org/TR/css-page-3/
• @counter-style ：https://www.w3.org/TR/css-counter-styles-3
• @keyframes ：https://www.w3.org/TR/css-animations-1/
• @fontface ：https://www.w3.org/TR/css-fonts-3/
• @supports ：https://www.w3.org/TR/css3-conditional/
• @namespace ：https://www.w3.org/TR/css-namespaces-3/
最重要的三条：@media、@keyframes、@fontface
## CSS规则
最常见的css规则：
选择器 
声明
- Key 
- Value

```css
div
{
	background
	-color: blue;
}
```
Selector
• https://www.w3.org/TR/selectors-3/
• https://www.w3.org/TR/selectors-4/
Key
• Properties
• Variables: https://www.w3.org/TR/css-variables/
Value
• https://www.w3.org/TR/css-values-4/
### selector
selector的标准中，现在实现比较好的是level3，level还在标准指定中。
key分为属性和变量两种，Variables引入了一种新的key值，以双减号开头。
value出了包含正常的值还有函数类型的值，不同的属性会有不同的value
selector-level3的产生式：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201220201625239.png)
selector_group的语法是由逗号分割的selector构成的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201220201756454.png)
每个selector由一个simple_selector_sequence组成，它们由combinator相连接。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201220201933912.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
combinator有加号、大于号、波浪线。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201220214740554.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
simple_selector_sequence 由简单选择器构成，简单选择器有类型选择器、universal选择器，可以是hash、class、attrib、伪类或伪元素选择器、带not的选择器（以:not开头的）
selector-level4 和selector-level3是类似的，但是它的选择器更加复杂，增加了伪类选择器，而且它的not也更加强大，还增加了或和与的关系。
### variable
variable的用法是我们去声明一个双减号开头的variable, 然后就可以在子元素里面使用这个variable：

```css
：root {
--main-color: white;
}

#foo h1 {
color: var(--main-color--);
}
```
# CSS选择器
[http://w3.org/TR](http://w3.org/TR)
这个页面可以找到所有的标准和draft

## 选择器
### 简单选择器
-  *
-  div svg|a
- .cls
- #id
- [attr=value]
- :hover
- ::before
### 选择器语法
复合选择器
- <简单选择器><简单选择器><简单选择器>
- * 或者 div 必须写在最前面
复杂选择器
- <复合选择器><sp><复合选择器>
- <复合选择器>">"<复合选择器>
- <复合选择器>"~"<复合选择器>
- <复合选择器>"+"<复合选择器>
- <复合选择器>"||"<复合选择器>

## 伪类
链接/行为
- :any-link
- :link :visited
- :hover
- :active
- :focus
- :target

树结构
- :empty
- :nth-child()
- :nth-last-child()
- :first-child :last-child :only-child

逻辑型
- :not伪类
- :where :has

## 伪元素
- ::before
- ::after
- ::first-line
- ::first-letter
before和after相当于添加了一个元素，可以设定排列方式伪inline，block，inline-block
first-line和first-letter的可用属性
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201221000046429.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
思考题：
为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？ first-letter是在布局完成之后，确定了一段文字中的第一个文字，可以对其操作布局时性能开销小； 而first-line选中的是第一行文字，不同元素的宽度、文档的宽度和文本的字体大小会导致选中的文字内容不一样，要对其重新布局排版消耗性能大,所以first-letter 可以设置 float 之类的，而 first-line 不行。

# CSS排版
## 盒
HTML代码中可以书写开始标签，结束标签，和自封闭标签。
一对起止标签，表示一个元素。
DOM树中存储的是元素和其它类型的节点（Node）。
CSS选择器选中的是元素。
CSS选择器选中的元素，在排版时可能产生多个盒。
排版和渲染的基本单位是盒。

盒模型：排版的时候用到的基本单位
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201221203806799.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
## 正常流
正常流排版 
- 收集盒进行
- 计算盒在行中的排布
- 计算行的排布

## 正常流的行级排布
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222110515363.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
看下一个例子：
在页面上放置一个有宽有高的inline-block
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222111637927.png)
看下运行效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222111708615.png)
我们的文字和这个inline-block是基于基线对齐的，所以盒子的下边缘和文字的基线去做一个对齐。
那么当我们在inline-block中加入文字呢？
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222142934883.png)
基线就变成了里面文字的基线：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020122214302780.png)
再加一个就变成了下一行，所以行内盒子的基线是随着自己里面的文字去变化的。
我们大部分情况下，使用行内盒子，可以使用verticle-align，top、middle、bottom 就是和行的顶缘（中心线、底缘）对齐，这是几种最基本的模式，还可以和text-top和text-bottom去对齐。
## 正常流的块级排布
边界折叠：只有正常流里面才会发生边界折叠
## BFC合并
Block Container：里面有BFC的
• 能容纳正常流的盒，里面就有BFC
• Block-level Box：外面有BFC的
• Block Box = Block Container + Block-level Box：
里外都有BFC的

Block Container
• block
• inline-block
• table-cell
• flex item
• grid cell
• table-caption
所有能够容纳里面不是特殊的display模式的，里边默认就是正常流

Block-level Box
Block level
• display:block
• display: flex
• display: table
• display: grid
• ......
Inline level
• display: inline-block
• display: inline-flex
• display: inline-table
• display: inline-grid
• ......
display: run-in

设立BFC（四种情况）
• floats
• absolutely positioned elements
• block containers (such as inline-blocks, table-cells, and table-captions)
that are not block boxes,
• flex items
• grid cell
• ......
• and block boxes with 'overflow' other than 'visible'
总结下来只有一种情况不产生BFC：
block box && overflow:visible
• BFC合并与float
• BFC合并与边距折叠
看一下示例一：
overflow:visible的情况
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020122215435351.png)
overflow:hidden的情况，产生新的BFC
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020122215445682.png)
左边的元素整体作为一个block被排进新的BFC里面
示例二：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222154846869.png)
在这样的代码结构下，三个块元素会产生边界折叠：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222154952461.png)
三个边距折叠到一起，两个元素的距离为30px；
把粉色元素的overflow改为hidden进行BFC的创建
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222155119369.png)
此时粉色里面的元素和粉色不属于一个BFC了，所以不发生边界折叠，但是外边粉色和天蓝色的元素仍然处于同一个BFC中，所以仍然存在边界折叠。
## Flex排版
Flex排版
• 收集盒进行
• 计算盒在主轴方向的排布
• 计算盒在交叉轴方向的排布
# CSS动画与绘制
## 动画
Animation
• @keyframes定义关键帧
• animation: 使用关键帧

Animation
• animation-name 时间曲线
• animation-duration 动画的时长；
• animation-timing-function 动画的时间曲线；
• animation-delay 动画开始前的延迟；
• animation-iteration-count 动画的播放次数；
• animation-direction 动画的方向。

Transition
• transition-property 要变换的属性；
• transition-duration 变换的时长；
• transition-timing-function 时间曲线；
• transition-delay 延迟。

一次贝塞尔曲线
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222164410518.png)
二次贝塞尔曲线
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222164258211.png)
三次贝塞尔曲线
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020122216432119.png)
## 颜色
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020122217383579.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
和颜色认知的直觉是不一致的，所以并不好用，就有了一种新的颜色谱系：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201222191044231.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
H色相，六种基本颜色拼成色盘，Hue进行色盘选择时角度的指定。S杂色数量，S越高颜色越鲜艳，L亮度，V明度，在W3C体系中用到的是HSL，HSL作为一种语义化的颜色，在我们更改页面整体的色调的时候，对比度等都能得到保留，是非常有意义的。
## 绘制
几何图形
• border
• box-shadow
• border-radius
文字
• font
• text-decoration
位图
• background-image

data uri + svg
`data:image/svg+xml,<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg"><ellipse cx="300" cy="150"
rx="200" ry="80" style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2"/> </svg>`

# CSS脑图
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020122219381298.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
