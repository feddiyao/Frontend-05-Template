@[TOC](组件化)
# 组件的基本概念和基本组成部分
组件区别于模块，区别于对象，组件是和ui强相关的东西，它既是对象又是模块，它可以以树形结构来进行组合，并且有一定的模板化的配置的能力。
看一下组件和对象的区别：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109164547227.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
对象的三要素是属性、方法和继承关系。组件在此基础上又多了一些别的概念，其中最重要的是children，没有children就没办法形成树形结构，没有树形结构描述界面的能力就差了很多。
组件在对象的基础上加了这么多语义相关的概念，使得组件变成一种非常适合描述ui的概念。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109165924346.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
图片的最左边是最终组件的用户对组件进行的操作，这个可能会影响组件的state和它的子组件，右边是程序员的操作，程序员通过attribute来进行对组件内容的更改。method，property——使用组件的程序员向开发组件的程序员传递消息。event——开发组件的程序员向使用组件的程序员传递消息。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109170930265.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
上图展示了attribute和property的区别。
那么我们应该如何设计组件的状态呢？
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021010917172410.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
组件的生命周期分为以下几种：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109172207805.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
创建和销毁时最基本的，是否展示在页面上则形成了mount和unmount的生命周期，那一个组件啥时候会改变它的状态呢？终端用户输入和使用者通过代码进行更改会触发组件的更新。
我们的children也分为内容型的children和template型的children，内容型所见结构即所得，模板类型则更多的通过数据进行内容的渲染。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109172542953.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
# 为组件添加JSX语法
这一段和[https://blog.csdn.net/yfm120750310/article/details/108422545](https://blog.csdn.net/yfm120750310/article/details/108422545)
比较类似。
组件系统是一个由markup和js代码都可以访问的环境，所以我们需要建立一个能够使用markup的环境，这里有两种建立的风格：一种是基于react的jsx进行建立，还有一种是类似vue的标记语言的parser来进行建立。
下面说一下第一种风格： 首先创建一个新的项目，在项目中使用`npm init`来进行初始化（不需要修改默认配置）。
执行语句安装webpack，webpack是可以把require，import打包到一起去的插件：
`npm install -g webpack webpack-cli`
因为jsx是babel的一个插件，所以我们要接下去安装babel，babel是能够把新版本的js编译到老版本的里面去，这样新版本的js就能在老版本的浏览器里面去运行了：
`npm install --save-dev webpack babel-loader`
创建文件夹`webpack.config.js`
设置entry为main.js并且创建main.js文件夹：
```
module.exports = {
    entry: './main.js'
}
```
配置launch,json并且跑一下webpack:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109175326787.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)
这样就多了一个dist目录，下面安装babel-loader：
`npm install --save-dev @babel/core @babel/preset-env`
在babel的编译下我们原来main.js中的for-of代码：
```javascript
for (let i of [1, 2, 3]) {
    console.log(i)
}
```
被编译成了普通的for循环：
```javascript
(()=>{for(var o=0,l=[1,2,3];o<l.length;o++){var r=l[o];console.log(r)}})();
```
在webpack的配置中加入`mode: 'development'` 这样在调试的过程中代码就不会被压缩了：
```
module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test:/.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    mode: 'development'
}
```
再安装最重要的一个包：
`npm install --save-dev @babel/plugin-transform-react-jsx`
再完善webpack的配置
```
module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test:/.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-react-jsx']
                    }
                }
            }
        ]
    },
    mode: 'development'
}
```
在main.js中写入jsx：
```javascript
for (let i of [1, 2, 3]) {
    console.log(i)
}

let a = <div/>
```
运行查看编译结果：
```
eval("for (var _i = 0, _arr = [1, 2, 3]; _i < _arr.length; _i++) {\n  var i = _arr[_i];\n  console.log(i);\n}\n\nvar a = /*#__PURE__*/React.createElement(\"div\", null);\n\n//# sourceURL=webpack://example/./main.js?");
```
可以看到jsx被编译成了`React.createElement`的形式。
我们将plugin进行更新：
```
plugins: [['@babel/plugin-transform-react-jsx', {pragma: "createElement"}]]
```
这样在编译结束之后，就能将`React.createElement`改为`createElement`
```
eval("for (var _i = 0, _arr = [1, 2, 3]; _i < _arr.length; _i++) {\n  var i = _arr[_i];\n  console.log(i);\n}\n\nvar a = createElement(\"div\", null);\n\n//# sourceURL=webpack://example/./main.js?");
```
这样一改就和与react没有任何关系了。
# 轮播组件
在刚才的基础上实现一个轮播的组件，首先抽离framwork.js
```javascript
export function createElement(type, attribute, ...children) {
    let element;
    if (typeof type === "string") element = new ElementWrapper(type);
    else element = new type();
    for (const name in attribute) {
      if (Object.hasOwnProperty.call(attribute, name)) {
        element.setAttribute(name, attribute[name]);
      }
    }
    for (const child of children) {
      if (typeof child === "string") {
        child = new TextWrapper(child);
      }
      element.appendChild(child);
    }
    return element;
  }
  export class Component {
    constructor(type) {
      //this.root = this.render();
    }
    setAttribute(name, value) {
      this.root.setAttribute(name, value);
    }
    appendChild(child) {
      child.mountTo(this.root);
    }
    mountTo(parent) {
      parent.appendChild(this.root);
    }
  }
  class ElementWrapper extends Component {
    constructor(type) {
      super();
      this.root = document.createElement(type);
    }
  }
  class TextWrapper extends Component {
    constructor(text) {
      super();
      this.root = document.createTextNode(text);
    }
  }
```
这样Carousel就可以通过继承获得这些属性，我们为了调试的时候更好的体验，安装以下几个包：
```
npm install webpack-dev-server --save-dev
npm install --save-dev webpack-cli
```
看一下main.js中carousel的实现：
```javascript
import { createElement, Component } from "./framework.js";

class Carousel extends Component {
  constructor() {
    super(); 
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for (const record of this.attributes.src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record}')`;
      this.root.appendChild(child);
    }
    /*
     ** 手动拖拽
     */
    let position = 0;
    this.root.addEventListener("mousedown", (event) => {
      let startX = event.clientX;
      let children = this.root.children;

      let move = (event) => {
        let x = startX - event.clientX;
        for (const offset of [-1, 0, 1]) {
          let pos = (position + offset + children.length) % children.length;
          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${
            -pos * 571 - x + offset * 571
          }px)`;
        }
      };

      let up = (event) => {
        let x = startX - event.clientX;
        position = Math.round(x / 571) + position;
        for (const offset of [0, -Math.sign(x - (571 / 2) * Math.sign(x))]) {
          let pos = (position + offset + children.length) % children.length;
          children[pos].style.transition = "";
          children[pos].style.transform = `translateX(${
            -pos * 571 + offset * 571
          }px)`;
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    /* 自动播放
    let currentIndex = 0;
    setInterval(() => {
      let children = this.root.children;
      let current = children[currentIndex];
      let nextIndex = (currentIndex + 1) % children.length;
      let next = children[nextIndex];
      next.style.transition = "none";
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
      setTimeout(() => {
        next.style.transition = ""; 
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
        next.style.transform = `translateX(${-nextIndex * 100}%)`;
        currentIndex = nextIndex;
      }, 16);
      // 浏览器刷新一帧的时间
    }, 3000);
    */
    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let d = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

let a = <Carousel src={d} />;
a.mountTo(document.body);
```
可以看到，为了实现播完之后继续回到第一张图的效果，我们会保存当前帧和下一帧。
# 动画
在为轮播加入动画之前，我们先把carousel抽离为一个文件。
单独建立一个animation.js先看一下写动画常用逻辑的三种方式：
```javascript
setInterval(() => {}, 16)

let tick = () => {
    setTimeout(tick, 16)
}

let tick = () => {
    //申请浏览器执行下一帧的时候来执行这个代码
    requestAnimationFrame(tick, 16)
}
```
我们首先完成基础架构的搭建：

```javascript
//使用Symbol防止外部访问变量
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick_handler");
const ANIMATIONS = Symbol("animations");

class Timeline {
	constructor() {
		this[ANIMATIONS] = new Set();
	}

	start() {
		let startTime = Date.now();
		this[TICK] = () => {
			let t = Date.now() - startTime;
			for (const animation of this[ANIMATIONS]) {
				let t0 = t;
				if (animation.duration < t) {
					this[ANIMATIONS].delete(animation);
					t0 = animation.duration; //修复时间超出范围的问题
				}
				animation.receive(t0);
			}
			//这里进行函数的自调用
			requestAnimationFrame(this[TICK]);
		};
		this[TICK]();
	}

	set rate(val) {
		this.rate = val;
	}

	get rate() {
		return this.rate;
	}

	pause() {}

	resume() {}

	reset() {}

	add(animation) {
		this[ANIMATIONS].add(animation);
	}
}

class Animation {
	constructor(object, property, startValue, endValue, duration, timingFunction) {
		this.object = object;
		this.property = property;
		this.startValue = startValue;
		this.endValue = endValue;
		this.duration = duration;
		this.timingFunction = timingFunction;
	}
	receive(time) {
		let range = this.endValue - this.startValue;
		let stepDiff = (range * time) / this.duration;
		this.object[this.property] = this.startValue + stepDiff;
	}
}

export { Timeline, Animation };
```
然后进行时间线开始时间的修复：

```javascript
/**
 * 修复时间线的开始时间和 动画开始时间的差异
 */

//使用Symbol防止外部访问变量
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");

class Timeline {
	constructor() {
		this[ANIMATIONS] = new Set();
		this[START_TIME] = new Map();
	}

	start() {
		let startTime = Date.now();
		this[TICK] = () => {
			let now = Date.now();
			for (const animation of this[ANIMATIONS]) {
				let t;
				if (this[START_TIME].get(animation) < startTime) {
					t = now - startTime; // 修复时间线开始时间和动画和动画开始时间的差异
				} else {
					t = now - this[START_TIME].get(animation); // 修复时间线开始时间和动画和动画开始时间的差异
				}

				if (animation.duration < t) {
					this[ANIMATIONS].delete(animation);
					t = animation.duration;
				}
				animation.receive(t);
			}
			requestAnimationFrame(this[TICK]);
		};
		this[TICK]();
	}

	set rate(val) {
		this.rate = val;
	}

	get rate() {
		return this.rate;
	}

	pause() {}

	resume() {}

	reset() {}

	add(animation, startTime) {
		if (arguments.length < 2) {
			startTime = Date.now();
		}
		this[ANIMATIONS].add(animation);
		this[START_TIME].set(animation, startTime); //设置动画开始时间
	}
}

class Animation {
	constructor(object, property, startValue, endValue, duration, delay, timingFunction) {
		this.object = object;
		this.property = property;
		this.startValue = startValue;
		this.endValue = endValue;
		this.duration = duration;
		this.timingFunction = timingFunction;
		this.delay = delay;
	}
	receive(time) {
		let range = this.endValue - this.startValue;
		let stepDiff = (range * time) / this.duration;
		this.object[this.property] = this.startValue + stepDiff;
	}
}

export { Timeline, Animation };
```
添加暂停和开始功能：
```javascript
/**
 *  添加暂停和重新开始功能
 */

//使用Symbol防止外部访问变量
const TICK = Symbol("tick"); //每帧执行的动作
const TICK_HANDLER = Symbol("tick-handler"); //请求动画帧的句柄
const ANIMATIONS = Symbol("animations"); //动画
const START_TIME = Symbol("start-time"); //每个动画的开始时间
const PAUSE_START = Symbol("pause-start"); //暂停开始时间
const PAUSE_TIME = Symbol("pause-time"); //累计暂停的时间总和

class Timeline {
	constructor() {
		this[ANIMATIONS] = new Set();
		this[START_TIME] = new Map();
	}

	start() {
		let startTime = Date.now();
		this[PAUSE_TIME] = 0;
		this[TICK] = () => {
			let now = Date.now();
			for (const animation of this[ANIMATIONS]) {
				let t;
				if (this[START_TIME].get(animation) < startTime) {
					/*
					 * 1.时间线开始时间和添加aninmation的时间不一致，需要now-startTime统一这两个时间
					 * 2.暂停的时间会导致时间线的时间和动画的时间不一致，需要-this[PAUSE_TIME]统一这两个时间
					 * */
					t = now - startTime - this[PAUSE_TIME];
				} else {
					t = now - this[START_TIME].get(animation) - this[PAUSE_TIME];
				}
				if (animation.duration < t) {
					this[ANIMATIONS].delete(animation);
					t = animation.duration; //修复时间超出范围的问题
				}
				animation.receive(t);
			}
			this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
		};
		this[TICK]();
	}

	set rate(val) {
		this.rate = val;
	}

	get rate() {
		return this.rate;
	}

	pause() {
		this[PAUSE_START] = Date.now(); //记录暂停开始时间
		cancelAnimationFrame(this[TICK_HANDLER]);
	}

	resume() {
		this[PAUSE_TIME] += Date.now() - this[PAUSE_START]; //暂停重新开始时 累加暂停的时间
		console.log(this[PAUSE_TIME]);
		this[TICK]();
	}

	reset() {}

	add(animation, startTime) {
		if (arguments.length < 2) {
			startTime = Date.now();
		}
		this[ANIMATIONS].add(animation);
		this[START_TIME].set(animation, startTime);
	}
}

class Animation {
	constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
		this.object = object;
		this.property = property;
		this.startValue = startValue;
		this.endValue = endValue;
		this.duration = duration;
		this.timingFunction = timingFunction;
		this.delay = delay;
		this.template = template;
	}
	receive(time) {
		let range = this.endValue - this.startValue;
		let stepDiff = (range * time) / this.duration;
		this.object[this.property] = this.template(this.startValue + stepDiff);
	}
}

export { Timeline, Animation };
```
我们继续完善`delay`和`timingFunction`的逻辑：

```javascript
/**
 * 1. 处理delay
 * 2. 处理timingFunction
 */

import { linear } from "./timingFunction";

//使用Symbol防止外部访问变量
const TICK = Symbol("tick"); //每帧执行的动作
const TICK_HANDLER = Symbol("tick-handler"); //请求动画帧的句柄
const ANIMATIONS = Symbol("animations"); //动画
const START_TIME = Symbol("start-time"); //每个动画的开始时间
const PAUSE_START = Symbol("pause-start"); //暂停开始时间
const PAUSE_TIME = Symbol("pause-time"); //累计暂停的时间总和

class Timeline {
	constructor() {
		this.state = "inited";
		this[ANIMATIONS] = new Set();
		this[START_TIME] = new Map();
	}

	start() {
		if (this.state !== "inited") return;
		this.state = "started";
		let startTime = Date.now();
		this[PAUSE_TIME] = 0;
		//let p = 0;
		//let test = document.getElementById("test");
		this[TICK] = () => {
			//p = performance.now() - p;
			//test.appendChild(document.createTextNode(p));
			//test.appendChild(document.createElement("br"));
			let now = Date.now();
			for (const animation of this[ANIMATIONS]) {
				let t;
				if (this[START_TIME].get(animation) < startTime) {
					t = now - startTime - this[PAUSE_TIME] - animation.delay; //核心1
				} else {
					t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay; //核心1
				}
				if (animation.duration < t) {
					this[ANIMATIONS].delete(animation);
					t = animation.duration;
				}
				if (t > 0) animation.receive(t); //核心1
			}
			this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
		};
		this[TICK]();
	}

	set rate(val) {
		this.rate = val;
	}

	get rate() {
		return this.rate;
	}

	pause() {
		if (this.state !== "started") return;
		this.state = "pause";
		this[PAUSE_START] = Date.now();
		cancelAnimationFrame(this[TICK_HANDLER]);
	}

	resume() {
		if (this.state !== "pause") return;
		this.state = "started";
		this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
		this[TICK]();
	}

	reset() {
		this.pause();
		this.state = "inited";
		//let startTime = Date.now();  //感觉视频中这句代码有问题
		this[ANIMATIONS] = new Set();
		this[START_TIME] = new Map();
		this[PAUSE_START] = 0;
		this[PAUSE_TIME] = 0;
		this[TICK_HANDLER] = null;
	}

	add(animation, startTime) {
		if (arguments.length < 2) {
			startTime = Date.now();
		}
		this[ANIMATIONS].add(animation);
		this[START_TIME].set(animation, startTime);
	}
}

class Animation {
	constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
		this.timingFunction = timingFunction || linear;
		this.template = template || ((v) => v);
		this.object = object;
		this.property = property;
		this.startValue = startValue;
		this.endValue = endValue;
		this.duration = duration;
		this.delay = delay;
	}
	receive(time) {
		let range = this.endValue - this.startValue;
		let progress = time / this.duration;
		let stepDiff = range * this.timingFunction(progress);
		this.object[this.property] = this.template(this.startValue + stepDiff);
	}
}

export { Timeline, Animation };
```
# 手势
这时候依然存在很多的细节问题，比如鼠标的拖拽并不支持touch事件，只支持mouse事件等。
因此我们有必要去做一些这样的工作来进行完善，看一下基础手势的体系：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210117174933373.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70)我们一般用10px作为一个误差的容错范围（retina屏幕），如果是三倍屏的话就是15px。
看一下相关的基本框架，我们定义四个函数作为判断手势：
```javascript
/**
 * 统一电脑端的鼠标事件和移动端的手势事件的触发调用为以下 4个函数
 * start
 * move
 * end
 * cancel(移动端才有，电脑端没有)
 *
 */

let element = document.documentElement;

element.addEventListener("mousedown", (event) => {
	start(event);
	const mousemove = (event) => {
		move(event);
	};
	const mouseup = (event) => {
		end(event);
		document.removeEventListener("mousemove", mousemove);
		document.removeEventListener("mouseup", mouseup);
	};
	document.addEventListener("mousemove", mousemove);
	document.addEventListener("mouseup", mouseup);
});

element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		start(touch);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		move(touch);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		end(touch);
	}
});

//诸如window.alert系统事件会打断touch事件，将touch事件的状态改变为cancel
element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		cancel(touch);
	}
});

const start = (point) => {
	//这里在浏览器的移动版的话， start会触发两次 
	console.log("start", point.clientX, point.clientY);
};

const move = (point) => {
	console.log("move", point.clientX, point.clientY);
};

const end = (point) => {
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point) => {
	console.log("cancel", point.clientX, point.clientY);
};
```
接下来我们来完善哥哥方法的逻辑，手下是start，按照我们的手势体系图，这个分为了三种情况，以此推类，进行完善：
```javascript
/**
 *
 * 为start, move, end, cancel添加具体处理逻辑
 * 抽象出tap, pan, press 3种事件
 *
 */

let element = document.documentElement;

element.addEventListener("mousedown", (event) => {
	start(event);
	const mousemove = (event) => {
		move(event);
	};
	const mouseup = (event) => {
		end(event);
		document.removeEventListener("mousemove", mousemove);
		document.removeEventListener("mouseup", mouseup);
	};
	document.addEventListener("mousemove", mousemove);
	document.addEventListener("mouseup", mouseup);
});

element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		start(touch);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		move(touch);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		end(touch);
	}
});

//诸如window.alert系统事件会打断touch事件，将touch事件的状态改变为cancel
element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		cancel(touch);
	}
});

let handler;
let startX, startY;
let isTap = true;
let isPan = false;
let isPress = false;

const start = (point) => {
	console.log("start", point.clientX, point.clientY);
	startX = point.clientX;
	startY = point.clientY;

	isTap = true;
	isPan = false;
	isPress = false;

	handler = setTimeout(() => {
		isPress = true;
		isPan = false;
		isTap = false;
		handler = null;
		console.log("press");
	}, 500);
};

const move = (point) => {
	let dx = point.clientX - startX,
		dy = point.clientY - startY;
	if (!isPan && dx ** 2 + dy ** 2 > 100) {
		isPan = true;
		isPress = false;
		ifTap = false;
		clearTimeout(handler);
		handler = null;
		console.log("pan start");
	}
	if (isPan) {
		console.log(dx, dy);
		console.log("pan start");
	}
	console.log("move", point.clientX, point.clientY);
};

const end = (point) => {
	if (isTap) {
		clearTimeout(handler);
		console.log("tap");
	}
	if (isPan) {
		console.log("panend");
	}
	if (isPress) {
		//clearTimeout(handler);
		console.log("pressend");
	}
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point) => {
	console.log("cancel", point.clientX, point.clientY);
};
```
我们会发现，鼠标点击可能会有左右键的情况，而触碰可能有多个，所以全局变量的形式是错误的，我们需要继续进行优化：
```javascript
/**
 *
 * 将全局变量改为Context，以变支持多个按键同时按下的事件
 *
 */

let element = document.documentElement;

element.addEventListener("mousedown", (event) => {
	let context = Object.create(null);
	contexts.set(`mouse${1 << event.button}`, context);

	start(event, context);
	const mousemove = (event) => {
		/* event.buttons 采用掩码设计
		 * 0b11111  表示5个全按下
		 * 0b00001  表示左键按下
		 * 0b00010  表示中键按下
		 * 0b00011  表示中键和左键按下
		 */
		let button = 1;
		while (button <= event.buttons) {
			if (button & event.buttons) {
				//event.buttons的顺序和button是不一致的，需要调整
				let key;
				if (button === 2) key = 4;
				else if (button === 4) key = 2;
				else key = button;

				let context = contexts.get(`mouse${key}`);
				move(event, context);
			}
			button = button << 1;
		}
	};
	const mouseup = (event) => {
		context = contexts.get(`mouse${1 << event.button}`);
		end(event, context);
		contexts.delete(`mouse${1 << event.button}`);

		document.removeEventListener("mousemove", mousemove);
		document.removeEventListener("mouseup", mouseup);
	};
	document.addEventListener("mousemove", mousemove);
	document.addEventListener("mouseup", mouseup);
});

let contexts = new Map(); //移动端 创建map保存上下文
element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		//开始事件中创建上下文
		const context = Object.create(null);
		contexts.set(touch.identifier, context);
		start(touch, context);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		//移动事件中使用上下文
		const context = contexts.get(touch.identifier);
		move(touch, context);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		//结束事件中使用并删除上下文
		const context = contexts.get(touch.identifier);
		end(touch, context);
		contexts.delete(touch.identifier);
	}
});

//诸如window.alert系统事件会打断touch事件，将touch事件的状态改变为cancel
element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		//中断事件中使用并删除上下文
		const context = contexts.get(touch.identifier);
		cancel(touch, context);
		contexts.delete(touch.identifier);
	}
});

const start = (point, context) => {
	//为什么这里， start会触发两次 ????????
	console.log("start", point.clientX, point.clientY);
	context.startX = point.clientX;
	context.startY = point.clientY;

	context.isTap = true;
	context.isPan = false;
	context.sPress = false;

	context.handler = setTimeout(() => {
		context.isPress = true;
		context.isPan = false;
		context.isTap = false;
		context.handler = null;
		console.log("press");
	}, 500);
};

const move = (point, context) => {
	context.dx = point.clientX - context.startX;
	context.dy = point.clientY - context.startY;
	if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
		context.isPan = true;
		context.isPress = false;
		context.isTap = false;
		clearTimeout(context.handler);
		context.handler = null;
		console.log("pan start");
	}
	if (context.isPan) {
		console.log(context.dx, context.dy);
	}
	console.log("move", point.clientX, point.clientY);
};

const end = (point, context) => {
	if (context.isTap) {
		clearTimeout(context.handler);
		console.log("tap");
	}
	if (context.isPan) {
		console.log("panend");
	}
	if (context.isPress) {
		console.log("pressend");
	}
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point, context) => {
	console.log("cancel", point.clientX, point.clientY);
};

```
```javascript
/**
 *
 * 处理鼠标多个按键同时按下，move事件会触发多次的问题
 *
 */

let element = document.documentElement;

let isListeningMouse = false; //核心

element.addEventListener("mousedown", (event) => {
	let context = Object.create(null);
	contexts.set(`mouse${1 << event.button}`, context);

	start(event, context);
	const mousemove = (event) => {
		/* event.buttons 采用掩码设计
		 * 0b11111  表示5个全按下
		 * 0b00001  表示左键按下
		 * 0b00010  表示中键按下
		 * 0b00011  表示中键和左键按下
		 */
		isListeningMouse = true;
		let button = 1;
		while (button <= event.buttons) {
			if (button & event.buttons) {
				let key;
				if (button === 2) key = 4;
				else if (button === 4) key = 2;
				else key = button;

				let context = contexts.get(`mouse${key}`);
				move(event, context);
			}
			button = button << 1;
		}
	};
	const mouseup = (event) => {
		context = contexts.get(`mouse${1 << event.button}`);
		end(event, context);
		contexts.delete(`mouse${1 << event.button}`);

		if (event.buttons === 0) {
			//只有当鼠标按键全部抬起时，才移除move和up事件
			//核心
			document.removeEventListener("mousemove", mousemove);
			document.removeEventListener("mouseup", mouseup);
			isListeningMouse = false;
		}
	};

	if (!isListeningMouse) {
		//只需要监听一次mousemove和mouseup
		//核心
		document.addEventListener("mousemove", mousemove);
		document.addEventListener("mouseup", mouseup);
		isListeningMouse = true;
	}
});

let contexts = new Map();
element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		const context = Object.create(null);
		contexts.set(touch.identifier, context);
		start(touch, context);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		move(touch, context);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		end(touch, context);
		contexts.delete(touch.identifier);
	}
});

element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		cancel(touch, context);
		contexts.delete(touch.identifier);
	}
});

const start = (point, context) => {
	console.log("start", point.clientX, point.clientY);
	context.startX = point.clientX;
	context.startY = point.clientY;

	context.isTap = true;
	context.isPan = false;
	context.sPress = false;

	context.handler = setTimeout(() => {
		context.isPress = true;
		context.isPan = false;
		context.isTap = false;
		context.handler = null;
		console.log("press");
	}, 500);
};

const move = (point, context) => {
	context.dx = point.clientX - context.startX;
	context.dy = point.clientY - context.startY;
	if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
		context.isPan = true;
		context.isPress = false;
		context.isTap = false;
		clearTimeout(context.handler);
		context.handler = null;
		console.log("pan start");
	}
	if (context.isPan) {
		console.log(context.dx, context.dy);
	}
	console.log("move", point.clientX, point.clientY);
};

const end = (point, context) => {
	if (context.isTap) {
		clearTimeout(context.handler);
		console.log("tap");
	}
	if (context.isPan) {
		console.log("panend");
	}
	if (context.isPress) {
		console.log("pressend");
	}
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point, context) => {
	console.log("cancel", point.clientX, point.clientY);
};
```

我们在上述的代码中已经识别出了事件，接下来需要完成的是对事件的派发：

```javascript
/**
 *
 * 派发一个自定义的事件
 *
 */

let element = document.documentElement;

let isListeningMouse = false;

element.addEventListener("mousedown", (event) => {
	let context = Object.create(null);
	contexts.set(`mouse${1 << event.button}`, context);

	start(event, context);
	const mousemove = (event) => {
		/* event.buttons 采用掩码设计
		 * 0b11111  表示5个全按下
		 * 0b00001  表示左键按下
		 * 0b00010  表示中键按下
		 * 0b00011  表示中键和左键按下
		 */
		isListeningMouse = true;
		let button = 1;
		while (button <= event.buttons) {
			if (button & event.buttons) {
				let key;
				if (button === 2) key = 4;
				else if (button === 4) key = 2;
				else key = button;

				let context = contexts.get(`mouse${key}`);
				move(event, context);
			}
			button = button << 1;
		}
	};
	const mouseup = (event) => {
		context = contexts.get(`mouse${1 << event.button}`);
		end(event, context);
		contexts.delete(`mouse${1 << event.button}`);

		if (event.buttons === 0) {
			document.removeEventListener("mousemove", mousemove);
			document.removeEventListener("mouseup", mouseup);
			isListeningMouse = false;
		}
	};

	if (!isListeningMouse) {
		document.addEventListener("mousemove", mousemove);
		document.addEventListener("mouseup", mouseup);
		isListeningMouse = true;
	}
});

let contexts = new Map();
element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		const context = Object.create(null);
		contexts.set(touch.identifier, context);
		start(touch, context);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		move(touch, context);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		end(touch, context);
		contexts.delete(touch.identifier);
	}
});

element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		cancel(touch, context);
		contexts.delete(touch.identifier);
	}
});

const start = (point, context) => {
	console.log("start", point.clientX, point.clientY);
	context.startX = point.clientX;
	context.startY = point.clientY;

	context.isTap = true;
	context.isPan = false;
	context.sPress = false;

	context.handler = setTimeout(() => {
		context.isPress = true;
		context.isPan = false;
		context.isTap = false;
		context.handler = null;
		console.log("press");
	}, 500);
};

const move = (point, context) => {
	context.dx = point.clientX - context.startX;
	context.dy = point.clientY - context.startY;
	if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
		context.isPan = true;
		context.isPress = false;
		context.isTap = false;
		clearTimeout(context.handler);
		context.handler = null;
		console.log("pan start");
	}
	if (context.isPan) {
		console.log(context.dx, context.dy);
	}
	console.log("move", point.clientX, point.clientY);
};

const end = (point, context) => {
	if (context.isTap) {
		clearTimeout(context.handler);
		dispatch("tap", {}); //============== 核心
		console.log("tap");
	}
	if (context.isPan) {
		console.log("panend");
	}
	if (context.isPress) {
		console.log("pressend");
	}
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point, context) => {
	console.log("cancel", point.clientX, point.clientY);
};

//核心
function dispatch(type, properties) {
	let event = new Event(type);
	//let event = new CustomEvent(type,{});  // CustomeEvent 这个也可以用
	for (const name in properties) {
		event[name] = properties[name];
	}

	element.dispatchEvent(event);
}
```
整体的功能到这里就差不多了，我们再考虑一下如何实现flick事件：
```javascript
/**
 *
 * 实现flick事件
 * 在context中新增一个points属性，用于存n个移动的点，通过这些点来计算是否需要flick
 *
 */

let element = document.documentElement;

let isListeningMouse = false;

element.addEventListener("mousedown", (event) => {
	let context = Object.create(null);
	contexts.set(`mouse${1 << event.button}`, context);

	start(event, context);
	const mousemove = (event) => {
		/* event.buttons 采用掩码设计
		 * 0b11111  表示5个全按下
		 * 0b00001  表示左键按下
		 * 0b00010  表示中键按下
		 * 0b00011  表示中键和左键按下
		 */
		isListeningMouse = true;
		let button = 1;
		while (button <= event.buttons) {
			if (button & event.buttons) {
				let key;
				if (button === 2) key = 4;
				else if (button === 4) key = 2;
				else key = button;

				let context = contexts.get(`mouse${key}`);
				move(event, context);
			}
			button = button << 1;
		}
	};
	const mouseup = (event) => {
		context = contexts.get(`mouse${1 << event.button}`);
		end(event, context);
		contexts.delete(`mouse${1 << event.button}`);

		if (event.buttons === 0) {
			document.removeEventListener("mousemove", mousemove);
			document.removeEventListener("mouseup", mouseup);
			isListeningMouse = false;
		}
	};

	if (!isListeningMouse) {
		document.addEventListener("mousemove", mousemove);
		document.addEventListener("mouseup", mouseup);
		isListeningMouse = true;
	}
});

let contexts = new Map();
element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		const context = Object.create(null);
		contexts.set(touch.identifier, context);
		start(touch, context);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		move(touch, context);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		end(touch, context);
		contexts.delete(touch.identifier);
	}
});

element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		cancel(touch, context);
		contexts.delete(touch.identifier);
	}
});

const start = (point, context) => {
	console.log("start", point.clientX, point.clientY);
	context.startX = point.clientX;
	context.startY = point.clientY;

	context.points = [
		//核心  用于计算最后的速度
		{
			t: Date.now(),
			x: point.clientX,
			y: point.clientY,
		},
	];

	context.isTap = true;
	context.isPan = false;
	context.sPress = false;

	context.handler = setTimeout(() => {
		context.isPress = true;
		context.isPan = false;
		context.isTap = false;
		context.handler = null;
		console.log("press");
	}, 500);
};

const move = (point, context) => {
	context.dx = point.clientX - context.startX;
	context.dy = point.clientY - context.startY;
	if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
		context.isPan = true;
		context.isPress = false;
		context.isTap = false;
		clearTimeout(context.handler);
		context.handler = null;
		console.log("pan start");
	}
	if (context.isPan) {
		console.log(context.dx, context.dy);
	}

	context.points.filter((p) => Date.now() - p.t < 500); //过滤掉500ms之前的，留下500ms之内的
	context.points.push({
		t: Date.now(),
		x: point.clientX,
		y: point.clientY,
	});

	console.log("move", point.clientX, point.clientY);
};

const end = (point, context) => {
	if (context.isTap) {
		clearTimeout(context.handler);
		dispatch("tap", {});
		console.log("tap");
	}
	if (context.isPan) {
		console.log("panend");
	}
	if (context.isPress) {
		console.log("pressend");
	}

	context.points = context.points.filter((p) => Date.now() - p.t < 500); //过滤掉500ms之前的，留下500ms之内的
	let d, v;
	if (context.points.length === 0) {
		//如果500ms内没有点，说明up之前，mouse或手势停了下来，v=0
		v = 0;
	} else {
		d = Math.sqrt(
			(point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2,
		); //移动距离 (用points里面第0个点和当前点计算， 第0个点是最早的那个点)
		v = d / (Date.now() - context.points[0].t); //移动速度
	}
	console.log("v", v);
	if (v > 1.5) {
		//1.5是个经验值， 大于1.5认为是flick
		console.log("flick");
		context.isFlick = true;
	} else {
		context.isFlick = false;
	}
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point, context) => {
	console.log("cancel", point.clientX, point.clientY);
};

function dispatch(type, properties) {
	let event = new Event(type);
	//let event = new CustomEvent(type,{});  // CustomeEvent 这个也可以用
	for (const name in properties) {
		event[name] = properties[name];
	}

	element.dispatchEvent(event);
}
```
进行剩下的事件的派发的添加：

```javascript
/**
 *
 * 添加其他的事件（panend, pressend, flick, cancel）派发
 *
 */

let element = document.documentElement;

let isListeningMouse = false;

element.addEventListener("mousedown", (event) => {
	let context = Object.create(null);
	contexts.set(`mouse${1 << event.button}`, context);

	start(event, context);
	const mousemove = (event) => {
		/* event.buttons 采用掩码设计
		 * 0b11111  表示5个全按下
		 * 0b00001  表示左键按下
		 * 0b00010  表示中键按下
		 * 0b00011  表示中键和左键按下
		 */
		isListeningMouse = true;
		let button = 1;
		while (button <= event.buttons) {
			if (button & event.buttons) {
				let key;
				if (button === 2) key = 4;
				else if (button === 4) key = 2;
				else key = button;

				let context = contexts.get(`mouse${key}`);
				move(event, context);
			}
			button = button << 1;
		}
	};
	const mouseup = (event) => {
		context = contexts.get(`mouse${1 << event.button}`);
		end(event, context);
		contexts.delete(`mouse${1 << event.button}`);

		if (event.buttons === 0) {
			document.removeEventListener("mousemove", mousemove);
			document.removeEventListener("mouseup", mouseup);
			isListeningMouse = false;
		}
	};

	if (!isListeningMouse) {
		document.addEventListener("mousemove", mousemove);
		document.addEventListener("mouseup", mouseup);
		isListeningMouse = true;
	}
});

let contexts = new Map();
element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		const context = Object.create(null);
		contexts.set(touch.identifier, context);
		start(touch, context);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		move(touch, context);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		end(touch, context);
		contexts.delete(touch.identifier);
	}
});

element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		cancel(touch, context);
		contexts.delete(touch.identifier);
	}
});

const start = (point, context) => {
	console.log("start", point.clientX, point.clientY);
	context.startX = point.clientX;
	context.startY = point.clientY;

	context.points = [
		{
			t: Date.now(),
			x: point.clientX,
			y: point.clientY,
		},
	];

	context.isTap = true;
	context.isPan = false;
	context.sPress = false;

	context.handler = setTimeout(() => {
		context.isPress = true;
		context.isPan = false;
		context.isTap = false;
		context.handler = null;
		console.log("press");
	}, 500);
};

const move = (point, context) => {
	context.dx = point.clientX - context.startX;
	context.dy = point.clientY - context.startY;
	if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
		context.isPan = true;
		context.isPress = false;
		context.isTap = false;
		clearTimeout(context.handler);
		context.handler = null;
		console.log("pan start");
	}
	if (context.isPan) {
		//============== 核心
		dispatch("panstart", {
			clientX: point.clientX,
			clientY: point.clientY,
		});
		console.log(context.dx, context.dy);
	}

	context.points.filter((p) => Date.now() - p.t < 500);
	context.points.push({
		t: Date.now(),
		x: point.clientX,
		y: point.clientY,
	});

	console.log("move", point.clientX, point.clientY);
};

const end = (point, context) => {
	if (context.isTap) {
		clearTimeout(context.handler);
		//============== 核心
		dispatch("tap", {
			clientX: point.clientX,
			clientY: point.clientY,
		});
		console.log("tap");
	}
	if (context.isPan) {
		//============== 核心
		dispatch("panend", {
			clientX: point.clientX,
			clientY: point.clientY,
		});
		console.log("panend");
	}
	if (context.isPress) {
		//============== 核心
		dispatch("pressend", {
			clientX: point.clientX,
			clientY: point.clientY,
		});
		console.log("pressend");
	}

	context.points = context.points.filter((p) => Date.now() - p.t < 500); //过滤掉500ms之前的，留下500ms之内的
	let d, v;
	if (context.points.length === 0) {
		//如果500ms内没有点，说明up之前，mouse或手势停了下来，v=0
		v = 0;
	} else {
		d = Math.sqrt(
			(point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2,
		); //移动距离 (用points里面第0个点和当前点计算， 第0个点是最早的那个点)
		v = d / (Date.now() - context.points[0].t); //移动速度
	}
	console.log("v", v);
	if (v > 1.5) {
		//1.5是个经验值， 大于1.5认为是flick
		console.log("flick");
		context.isFlick = true;
		//============== 核心
		dispatch("flick", {
			clientX: point.clientX,
			clientY: point.clientY,
			speed: v,
		});
	} else {
		context.isFlick = false;
	}
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point, context) => {
	console.log("cancel", point.clientX, point.clientY);
	//============== 核心
	dispatch("cacel", {
		clientX: point.clientX,
		clientY: point.clientY,
	});
};

//核心
function dispatch(type, properties) {
	let event = new Event(type);
	//let event = new CustomEvent(type,{});  // CustomeEvent 这个也可以用
	for (const name in properties) {
		event[name] = properties[name];
	}

	element.dispatchEvent(event);
}
```
这样就搞定了所有的代码，下面我们进行一下代码的封装：

```javascript
/**
 *
 * 按照 "监听 => 识别 => 派发" 解耦，封装成三部分
 * listen=>recognize=>dispatch
 *
 * new Listener(element, new Recognizer(new Dispatcher(element)))
 *
 */

let element = document.documentElement;

export class Dispatcher {
	constructor(element) {
		this.element = element;
	}
	dispatch(type, properties) {
		console.log("dispatch event:", type);
		let event = new Event(type);
		//let event = new CustomEvent(type,{});  // CustomeEvent 这个也可以用
		for (const name in properties) {
			event[name] = properties[name];
		}

		this.element.dispatchEvent(event);
	}
}

export class Listener {
	constructor(element, recognize) {
		let isListeningMouse = false;

		element.addEventListener("mousedown", (event) => {
			let context = Object.create(null);
			contexts.set(`mouse${1 << event.button}`, context);

			recognize.start(event, context);
			const mousemove = (event) => {
				/* event.buttons 采用掩码设计
				 * 0b11111  表示5个全按下
				 * 0b00001  表示左键按下
				 * 0b00010  表示中键按下
				 * 0b00011  表示中键和左键按下
				 */
				isListeningMouse = true;
				let button = 1;
				while (button <= event.buttons) {
					if (button & event.buttons) {
						let key;
						if (button === 2) key = 4;
						else if (button === 4) key = 2;
						else key = button;

						let context = contexts.get(`mouse${key}`);
						recognize.move(event, context);
					}
					button = button << 1;
				}
			};
			const mouseup = (event) => {
				context = contexts.get(`mouse${1 << event.button}`);
				recognize.end(event, context);
				contexts.delete(`mouse${1 << event.button}`);

				if (event.buttons === 0) {
					document.removeEventListener("mousemove", mousemove);
					document.removeEventListener("mouseup", mouseup);
					isListeningMouse = false;
				}
			};

			if (!isListeningMouse) {
				document.addEventListener("mousemove", mousemove);
				document.addEventListener("mouseup", mouseup);
				isListeningMouse = true;
			}
		});

		let contexts = new Map();
		element.addEventListener("touchstart", (event) => {
			for (const touch of event.changedTouches) {
				const context = Object.create(null);
				contexts.set(touch.identifier, context);
				recognize.start(touch, context);
			}
		});
		element.addEventListener("touchmove", (event) => {
			for (const touch of event.changedTouches) {
				const context = contexts.get(touch.identifier);
				recognize.move(touch, context);
			}
		});
		element.addEventListener("touchend", (event) => {
			for (const touch of event.changedTouches) {
				const context = contexts.get(touch.identifier);
				recognize.end(touch, context);
				contexts.delete(touch.identifier);
			}
		});

		element.addEventListener("touchcancel", (event) => {
			for (const touch of event.changedTouches) {
				const context = contexts.get(touch.identifier);
				recognize.cancel(touch, context);
				contexts.delete(touch.identifier);
			}
		});
	}
}

export class Recognizer {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
	}

	start(point, context) {
		context.startX = point.clientX;
		context.startY = point.clientY;

		context.points = [
			{
				t: Date.now(),
				x: point.clientX,
				y: point.clientY,
			},
		];

		context.isTap = true;
		context.isPan = false;
		context.sPress = false;

		context.handler = setTimeout(() => {
			context.isPress = true;
			context.isPan = false;
			context.isTap = false;
			context.handler = null;
			this.dispatcher.dispatch("press", {});
		}, 500);
	}

	move(point, context) {
		context.dx = point.clientX - context.startX;
		context.dy = point.clientY - context.startY;
		if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
			context.isPan = true;
			context.isPress = false;
			context.isTap = false;
			clearTimeout(context.handler);
			context.handler = null;
			context.isVertical = Math.abs(context.dx) < Math.abs(context.dy);

			this.dispatcher.dispatch("panstart", {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
			});
		}

		if (context.isPan) {
			this.dispatcher.dispatch("pan", {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
			});
		}

		context.points.filter((p) => Date.now() - p.t < 500);
		context.points.push({
			t: Date.now(),
			x: point.clientX,
			y: point.clientY,
		});
	}

	end(point, context) {
		if (context.isTap) {
			clearTimeout(context.handler);
			this.dispatcher.dispatch("tap", {
				clientX: point.clientX,
				clientY: point.clientY,
			});
		}
		if (context.isPress) {
			this.dispatcher.dispatch("pressend", {});
		}

		context.points = context.points.filter((p) => Date.now() - p.t < 500);
		let d, v;
		if (context.points.length === 0) {
			v = 0;
		} else {
			d = Math.sqrt(
				(point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2,
			);
			v = d / (Date.now() - context.points[0].t);
		}
		if (v > 1.5) {
			context.isFlick = true;
			this.dispatcher.dispatch("flick", {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
				isFlick: context.isFlick,
				velocity: v,
			});
		} else {
			context.isFlick = false;
		}
		if (context.isPan) {
			this.dispatcher.dispatch("panend", {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
				isFlick: context.isFlick,
			});
		}
	}

	cancel(point, context) {
		clearTimeout(context.handler);
		this.dispatcher.dispatch("cancel", {});
	}
}

export function enableGesture(element) {
	new Listener(element, new Recognizer(new Dispatcher(element)));
}
```
