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
      this.root = this.render();
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
