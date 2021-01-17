import { createElement, Component } from "./framework";
import Carousel from "./carousel";
import { Timeline, Animation } from "./animation";

let links = [
	"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1820723382,458456502&fm=26&gp=0.jpg",
	"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1343752650,3163174056&fm=26&gp=0.jpg",
	"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2711497450,1961596892&fm=26&gp=0.jpg",
	"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2669955272,3632053787&fm=26&gp=0.jpg",
	"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1870666799,3506622932&fm=26&gp=0.jpg",
	"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg",
];

let a = <Carousel src={links} />;

a.mountTo(document.body);

let tl = new Timeline();
let animation = new Animation(
	{
		set a(v) {
			console.log(v);
		},
	},
	"a",
	0,
	100,
	1000,
	2000,
	null,
);
window.tl = tl;
window.animation = animation;
tl.start();