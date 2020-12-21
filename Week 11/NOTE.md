学习笔记# CSS2.1语法
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
# @规则
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
# CSS规则
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
## selector
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
## variable
variable的用法是我们去声明一个双减号开头的variable, 然后就可以在子元素里面使用这个variable：

```css
：root {
--main-color: white;
}

#foo h1 {
color: var(--main-color--);
}
```
# CSS总论
[http://w3.org/TR](http://w3.org/TR)
这个页面可以找到所有的标准和draft

# 选择器
## 简单选择器
-  *
-  div svg|a
- .cls
- #id
- [attr=value]
- :hover
- ::before
## 选择器语法
复合选择器
- <简单选择器><简单选择器><简单选择器>
- * 或者 div 必须写在最前面
复杂选择器
- <复合选择器><sp><复合选择器>
- <复合选择器>">"<复合选择器>
- <复合选择器>"~"<复合选择器>
- <复合选择器>"+"<复合选择器>
- <复合选择器>"||"<复合选择器>

# 伪类
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

# 伪元素
- ::before
- ::after
- ::first-line
- ::first-letter
before和after相当于添加了一个元素，可以设定排列方式伪inline，block，inline-block
first-line和first-letter的可用属性
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201221000046429.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)

思考题：
为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？ first-letter是在布局完成之后，确定了一段文字中的第一个文字，可以对其操作布局时性能开销小； 而first-line选中的是第一行文字，不同元素的宽度、文档的宽度和文本的字体大小会导致选中的文字内容不一样，要对其重新布局排版消耗性能大,所以first-letter 可以设置 float 之类的，而 first-line 不行。