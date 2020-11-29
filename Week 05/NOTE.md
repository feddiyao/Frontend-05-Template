@[TOC](range对象实现DOM精确操作)
MDN接口文档：[https://developer.mozilla.org/zh-CN/docs/Web/API/Range](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)
# Range定义
我们先来看下MDN对range对象的定义：Range 接口表示一个包含节点与文本节点的一部分的文档片段。

# 使用方法
我们可以用 Document 对象的 Document.createRange 方法创建 Range，也可以用 Selection 对象的 getRangeAt 方法获取 Range。另外，还可以通过 Document 对象的构造函数 Range() 来得到 Range。
提到range对象我们就不得不提到Section对象，每一个Selection对象都有一个或多个Range对象，每一个Range对象代表用户用鼠标所选取范围内的一段连续区域。
# 使用场景
通过Range对象，可以获取用户选中的区域，或者指定选中区域，得到Range的起点和终点、修改或者复制里边的文本，甚至是html。在富文本编辑器开发中，经常会使用到这些功能。
# CSSOM
- CSSOM是CSS Object Model的缩写
- 大体上来说，CSSOM是一个建立在web页面上的 CSS 样式的映射
- 它和DOM类似，但是只针对CSS而不是HTML
- 浏览器将DOM和CSSOM结合来渲染web页面
# DOM操作的实现case
首先我们进行一个基础的拖拽功能的实现：
```javascript
<div id="dragable" style="width: 100px; height: 100px; background-color: pink;"></div>
<script>
    let dragable = document.getElementById("dragable");
    dragable.addEventListener("mousedown", function(event){
        let up = () => {
            document.removeEventListener("mousemove", move)
            document.removeEventListener("mouseup", up)
        };

        let move = (event) => {
            console.log(event)
        }
        document.addEventListener("mousemove", move)
        document.addEventListener("mouseup", up)
    })
</script>
```
在这里，当我们在dragable中点下并且拖拽，就可以监听到这个拖拽的事件，这是一个基础的拖拽骨架代码。
接下来对这个框的位置进行拖拽，优化move的代码逻辑：
```javascript
<div id="dragable" style="width: 100px; height: 100px; background-color: pink;"></div>
<script>
    let dragable = document.getElementById("dragable");
    //考虑多次拖拽
    let baseX = 0, baseY = 0;

    dragable.addEventListener("mousedown", function(event){
        //拖动的时候减去鼠标最初的位置
        let startX = event.clientX, startY = event.clientY;
        let up = () => {
            baseX = baseX + event.clientX - startX;
            baseY = baseY + event.clientY - startY;
            document.removeEventListener("mousemove", move)
            document.removeEventListener("mouseup", up)
        };

        let move = (event) => {
            dragable.style.transform = `translate(${baseX + event.clientX - startX}px, ${baseY + event.clientY - startY}px)`
        }
        document.addEventListener("mousemove", move)
        document.addEventListener("mouseup", up)
    })
</script>
```
接下来我们考虑将块拖拽到一堆文字的中间，首先是用range将能够安插的空位寻找出来：

```javascript
<div id="container">
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
</div>
<div id="dragable" style="width: 100px; height: 100px; background-color: pink;"></div>
<script>
    let dragable = document.getElementById("dragable");
    //考虑多次拖拽
    let baseX = 0, baseY = 0;

    dragable.addEventListener("mousedown", function(event){
        //拖动的时候减去鼠标最初的位置
        let startX = event.clientX, startY = event.clientY;
        let up = () => {
            baseX = baseX + event.clientX - startX;
            baseY = baseY + event.clientY - startY;
            document.removeEventListener("mousemove", move)
            document.removeEventListener("mouseup", up)
        };

        let move = (event) => {
            dragable.style.transform = `translate(${baseX + event.clientX - startX}px, ${baseY + event.clientY - startY}px)`
        }
        document.addEventListener("mousemove", move)
        document.addEventListener("mouseup", up)
    })

    let ranges = [];

    let container = document.getElementById("container");
    for(let i = 0; i < container.childNodes[0].textContent.length; i++) {
        let range = document.createRange();
        range.setStart(container.childNodes[0], i);
        range.setEnd(container.childNodes[0], i);

        console.log(range.getBoundingClientRect())
        ranges.push(range)
    }
</script>
```
看下打印结果，我们拿到了所有的range的位置：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201104163613652.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70#pic_left)
定义一个`getNearest`方法，来找距离当前最近的range：
```javascript
 function getNearest(x, y){
     let min = Infinity;
     let nearest = null;
     for (let range of ranges) {
         let rect = range.getBoundingClientRect();
         let distance = (rect.x - x) ** 2 + (rect.y - x) ** 2;
         if (distance < min) {
             nearest = range;
             min = distance
         }
     }
     return nearest;
 }
```
看下打印的结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201104164715211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70#pic_left) 我们修改之前的move逻辑，就能实现这个拖拽的效果：
```javascript
<div id="container">
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字 
    文字 文字 文字 文字 文字 文字
</div>
<div id="dragable" style="display: inline-block; width: 100px; height: 100px; background-color: pink;"></div>
<script>
    let dragable = document.getElementById("dragable");
    //考虑多次拖拽
    let baseX = 0, baseY = 0;

    dragable.addEventListener("mousedown", function(event){
        //拖动的时候减去鼠标最初的位置
        let startX = event.clientX, startY = event.clientY;
        let up = () => {
            baseX = baseX + event.clientX - startX;
            baseY = baseY + event.clientY - startY;
            document.removeEventListener("mousemove", move)
            document.removeEventListener("mouseup", up)
        };

        let move = (event) => {
            let range = getNearest(event.clientX, event.clientY);
            range.insertNode(dragable)
            // dragable.style.transform = `translate(${baseX + event.clientX - startX}px, ${baseY + event.clientY - startY}px)`
        }
        document.addEventListener("mousemove", move)
        document.addEventListener("mouseup", up)
    })

    let ranges = [];

    let container = document.getElementById("container");
    for(let i = 0; i < container.childNodes[0].textContent.length; i++) {
        let range = document.createRange();
        range.setStart(container.childNodes[0], i);
        range.setEnd(container.childNodes[0], i);

        console.log(range.getBoundingClientRect())
        ranges.push(range)
    }

    function getNearest(x, y){
        let min = Infinity;
        let nearest = null;
        for (let range of ranges) {
            let rect = range.getBoundingClientRect();
            let distance = (rect.x - x) ** 2 + (rect.y - x) ** 2;
            if (distance < min) {
                nearest = range;
                min = distance
            }
        }
        return nearest;
    }

    document.addEventListener("selectstart", event => event.preventDefault())
</script>
```
看下效果图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020110416534348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70#pic_left)
