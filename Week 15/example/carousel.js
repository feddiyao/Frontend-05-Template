import { createElement, Component } from "./framework";
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
		let i = 0;
		for (const src of this.attributes.src) {
			let child = document.createElement("div");
			child.appendChild(document.createTextNode(++i));
			child.style.backgroundImage = `url('${src}')`;
			this.root.appendChild(child);
		}
		/*
		const children = this.root.children;
		let currentIndex = 0;
		setInterval(() => {
			let nextIndex = (currentIndex + 1) % children.length;
			let current = children[currentIndex];
			let next = children[nextIndex];
			next.style.transition = "none";
		//	
		//	 
		//	  将下一张需要的图片放在准备的区域,由于是准备工作，不需要动画，需要在上一步把css动画取消
		//	 
		//	 
			next.style.transform = `translateX(${100 - 100 * nextIndex}%)`;
			setTimeout(() => {
				//需要下一个宏任务中执行当前动画，否则看不出任何效果
				next.style.transition = "";
			//	 
			//	  开始css动画，需要在上一步将取消CSS动画的style设置为空，这样做，才能使css样式中的transition动画重新生效
			//	 
				current.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`; //当前图片左移一个图片的位置
				next.style.transform = `translateX(-${100 * nextIndex}%)`; //下一张图片移动到当前图片
				currentIndex = nextIndex; //将移动到当前位置的下一张图片设为当前图片
			}, 16);
		}, 2000);
*/

		const children = this.root.children;
		let position = 0;
		const onMouseDown = (event) => {
			const startX = event.clientX;

			const onMouseMove = (event) => {
				const x = event.clientX - startX;
				//let current = position + Math.round(x/400) // 可能是负数
				//x-(x%400) 得到的数始终是400的整数倍, 所以(x-(x%400))/400始终是整数
				let current = position - (x - (x % 400)) / 400; //current计算出来是始终是整数
				for (const offset of [-2, -1, 0, 1, -2]) {
					//计算pos:  每张offset的图片的序号，比如第一张图，第二张图，第三张图
					let pos = offset + current; //可能是负数,需要处理负数的情况，
					pos = (pos + children.length) % children.length; //处理上面出现负数的情况  pos算出来
					children[pos].style.transition = "none"; //因为是准备动作，所以需要将动效取消
					// pos*400 : 距离当前图片位置的距离，-号表示将图片移动到当前图片位置
					// offset*400 : offset=-1表示前一张，*400表示向左移动400隐藏起来准备好;offset=1表示后一张，*400表示向右移动400隐藏起来准备好;
					// x%400: 其实对400取余主要是针对当move距离超过400时的情况，小于400时，其实就是x
					children[pos].style.transform = `translateX(${-pos * 400 + offset * 400 + (x % 400)}px)`;
				}
			};
			const onMouseUp = (event) => {
				const x = event.clientX - startX;
				position = position - Math.round(x / 400); //实现拖拽超过图片的一半尺寸，则会自动换一张图片的效果
				for (const offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
					//计算pos:  每张offset的图片的序号，比如第一张图，第二张图，第三张图
					let pos = offset + position; //可能是负数,需要处理负数的情况，
					pos = (pos + children.length) % children.length; //处理上面出现负数的情况  pos算出来
					children[pos].style.transition = ""; //将动效显示出来
					// pos*400 : 距离当前图片位置的距离，-号表示将图片移动到当前图片位置
					// offset*400 : offset=-1表示前一张，*400表示向左移动400隐藏起来准备好;offset=1表示后一张，*400表示向右移动400隐藏起来准备好;
					children[pos].style.transform = `translateX(${-pos * 400 + offset * 400}px)`;
				}
				//for (const child of children) {
				//child.style.transition = "";
				////child.style.transform = `translateX(${position * 400}px)`;
				//child.style.transform = `translateX(${-position * 400}px)`;
				//}
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
			};
			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);
		};
		this.root.addEventListener("mousedown", onMouseDown);

		return this.root;
	}
	mountTo(parent) {
		parent.appendChild(this.render()); //此处调render,而不是在constructor里面调render,可以确保在render之前拿到attributes
	}
}
export default Carousel;