@[TOC](字符串算法)
github地址：[https://github.com/feddiyao/Frontend-05-Template/tree/master/Week%2004](https://github.com/feddiyao/Frontend-05-Template/tree/master/Week%2004)
# 字符串分析算法
- 字典树——大量搞重复字符串的存储与分析
- KMP——在长字符串里找模式
- Wildcard——带通配符的字符串模式
- 正则——字符串通用模式匹配
- 状态机——通用的字符串分析
- LL LR——字符串多层级结构分析

#  字典树
看一下基础的字典树生成方法：

```javascript
<script>
    let $ = Symbol("$")
    class Trie {
        constructor(){
            // 用Object.create的方式创建字符串，避免原型上的一些一些污染
            this.root = Object.create(null);
        }
        insert(word) {
            let node = this.root;
            for(let c of word) {
                if(!node[c])
                node[c] = Object.create(null);
                node = node[c];
            }
            //为生成后的单词加入终结符
            if(!($ in node))
                node[$] = 0;

            node[$]++
        }
    }

    function randomWord(length){
        var s = "";
        for(let i = 0; i < length; i++)
          s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
        return s;  
    }

    let trie = new Trie();
    
    for(let i = 0; i < 100000; i ++) {
        trie.insert(randomWord(4));
    }
</script>
```
运行结果打印：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201030202748807.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lmbTEyMDc1MDMxMA==,size_16,color_FFFFFF,t_70#pic_left)
为了统计字典树最多的随机字符串，我们在Trie大类中加入most方法：

```javascript
  most(){
    let max = 0;
        let maxWord = null;
        let visit = (node, word) => {
            if(node[$] && node[$] > max) {
                max = node[$];
                maxWord = word;
            }
            for(let p in node) {
                visit(node[p], word + p);
            }
        }
        visit(this.root, "");
        console.log(maxWord, max);
    }
```
看下运行结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201030203416655.png#pic_left)
# KMP算法
kmp算法的原理网上能找到很多，就不细说了，我们都知道kmp算法的核心是获取子串的自重复特性，让我们以以下子串为例，进行分析：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201030211240447.png#pic_left )
首先在代码中定义table，存放子串重复数：

```javascript
function kmp(source, pattern) {
    //计算table
    let table = new Array(pattern.length).fill(0);

    let i = 1, j = 0;
    
    while(i < pattern.length) {
        if (pattern[i] === pattern[j]) {
            ++j, ++i;
            table[i] = j;
        } else {
            if (j > 0)
                j = table[j];
            else {
                ++i;
            }
        }
    }

    console.log(table);
    //abcdabce


}
kmp("","abcdabce")
```
看下运行的结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201030211353893.png#pic_left )
和我们表格中的预设是一致的。
补全kmp代码：
```javascript
 function kmp(source, pattern) {
    //计算table
    let table = new Array(pattern.length).fill(0);
    {
        let i = 1, j = 0;
    
        while(i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++j, ++i;
                table[i] = j;
            } else {
                if (j > 0)
                    j = table[j];
                else 
                    ++i;
            }
        }
    
        console.log(table);
    }

    {
        let i = 0, j = 0;
        while(i < source.length) {
            if(pattern[j] === source[i]){
                ++i, ++j;
            } else {
                if (j > 0)
                    j = table[j];
                else 
                    ++i;
            }

            if(j === pattern.length)
            return true;

        }
        return false
    }
   
    //abcdabce


}
console.log(kmp("abc","abc"))
```
# Wildcard
```javascript
function find(source, pattern) {
    let starCount = 0;
    for(let i = 0; i < pattern.length; i++) {
        if (pattern[i] == "*")
            starCount++;
    }
    if (starCount == 0) {
        for(let i = 0; i < pattern.length; i++) {
            if (pattern[i] !== source[i] && pattern[i] !== "?")
                return false;
        }
        return;
    }

    let i = 0;
    let lastIndex = 0;

    for(i = 0; pattern[i] !== "*"; i ++) {
        if (pattern[i] !== source[i] && pattern[i] !== "?") 
            return false;
    }

    lastIndex = i;

    for (let p = 0; p < starCount - 1; p ++) {
        i++;
        let subPattern = "";
        while(pattern[i] != "*") {
            subPattern += pattern[i];
            i++;
        }

        let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g");
        reg.lastIndex = lastIndex;

        if(!reg.exec(source))
            return false

        lastIndex = reg.lastIndex;
    }

    for (let j = 0; j < source.length - lastIndex && pattern[pattern.length - j] !== "*"; j++) {
        if(pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !== "?") 
            return false;
    }
    return true;
}

console.log(find("abcabcabxaac", "a*b?*b?x*c"))
```
