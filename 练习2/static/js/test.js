// 测试脚本

// 定义一个对象，键是对应的屏幕，值为屏幕内动画元素组成的数组
let screenAnimateElementsTest = {
    ".screen01": [
        ".screen01__title",
        ".screen01__subtitle"
    ],
    ".screen02": [
        ".screen02__title",
        ".screen02__title_tip",
        ".screen02__subtitle",
        ".screen02__item_image02",
        ".screen02__item_image03"
    ],
    ".screen03": [
        ".screen03__image",
        ".screen03__title",
        ".screen03__title_tip",
        ".screen03__subtitle",
        ".screen03__item_course"
    ],
    ".screen04": [
        ".screen04__title",
        ".screen04__subtitle",
        ".screen04__title_tip",
        ".screen04__item01",
        ".screen04__item02",
        ".screen04__item03",
        ".screen04__item04"
    ],
    ".screen05": [
        ".screen05__title",
        ".screen05__subtitle",
        ".screen05__title_tip",
        ".screen05__image"
    ]
};

// 定义一个函数用以测试动画效果
function setScreenAnimate(screenCls) {
    let screen = document.querySelector(screenCls), // 获取当前屏幕元素
        animateElements = screenAnimateElementsTest[screenCls], // 获取需要设置动画的元素数组
        isSetAnimateDone = false; // 元素动画样式是否切换初始值
    screen.onclick = function () {
        if (isSetAnimateDone === false) {
            // 将所有动画元素切换至 init
            for (let i of animateElements) {
                let animateElm = document.querySelector(i),
                    baseCls = animateElm.className.replace(" " + i.substr(1) + "_animate_done", "");
                animateElm.className = baseCls + " " + i.substr(1) + "_animate_init";
            }
            isSetAnimateDone = true;
        } else {
            // 将所有动画元素切换至 done
            for (let i of animateElements) {
                let animateElm = document.querySelector(i),
                    baseCls = animateElm.className;
                animateElm.className = baseCls.replace("_animate_init", "_animate_done");
            }
            isSetAnimateDone = false;
        }
    }
}

setScreenAnimate(".screen01");
setScreenAnimate(".screen02");
setScreenAnimate(".screen03");
setScreenAnimate(".screen04");
setScreenAnimate(".screen05");

// let screen02Image02 = document.querySelector(".screen02__item_image02");
// let screen02Image03 = document.querySelector(".screen02__item_image03");
//
// screen02Image02.addEventListener("transitionend", function () {
//     console.log("animate end");
//     if (screen02Image02.className.indexOf("done") !== -1) {
//         screen02Image03.className = screen02Image03.className + " screen02__item_image03_animate";
//         screen02Image03.style.opacity = "1";
//     } else {
//         screen02Image03.style.opacity = "0"
//     }
// });

// let screen03Image = document.querySelector(".screen03__image"),
//     screen03Item = document.querySelector(".screen03__item");
//
// screen03Image.addEventListener("transitionend", function () {
//     console.log("animate end2");
//     if (screen03Image.className.indexOf("done") !== -1) {
//         let time = setTimeout(function () {
//             screen03Item.className = screen03Item.className + " screen03__item_animate";
//             screen03Item.style.opacity = "1";
//         }, 500);
//         // screen03Item.addEventListener("transitionend", function () {
//         //     screen03Item.style.opacity = "1";
//         // });
//     } else {
//         screen03Item.style.opacity = "0"
//     }
//     // if (screen03Item.className.indexOf("animate") !== -1) {
//     //     screen03Item.style.opacity = "1"
//     // }
// });
