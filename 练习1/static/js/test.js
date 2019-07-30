// 定义一个对象，键是对应的屏幕，值是屏幕内有动画的元素
let screenAnimateElementsTest = {
    ".screen01": [
        '.screen01__title',
        '.screen01__phone',
        '.screen01__shadow'
    ],
    ".screen02": [
        '.screen02__title',
        '.screen02__subtitle',
        '.screen02__phone',
        '.screen02__phone__detail-left',
        '.screen02__phone__detail-right01',
        '.screen02__phone__detail-right02'
    ],
    ".screen03": [
        '.screen03__title',
        '.screen03__subtitle',
        '.screen03__phone',
        '.screen03__features'
    ],
    ".screen04": [
        '.screen04__title',
        '.screen04__subtitle',
        '.screen04__type01',
        '.screen04__type02',
        '.screen04__type03',
        '.screen04__type04'
    ],
    ".screen05": [
        '.screen05__title',
        '.screen05__subtitle',
        '.screen05__wrap'
    ]
};

// 定义一个函数，用以测试动画效果
function setScreenAnimate(screenCls) {
    let screen = document.querySelector(screenCls), // 获取当前屏元素
        animateEls = screenAnimateElementsTest[screenCls], // 需要设置动画的元素（数组）
        isSetAnimateDone = false; // 元素样式是否切换
    screen.onclick = function () {
        if (isSetAnimateDone === false) {
            // 将所有的 animateEls 切换至 init
            for (let i of animateEls) {
                let element = document.querySelector(i), // 获取每一个需要设置动画的元素
                    baseCls = element.className.replace(" " + i.substr(1) + "_animate_done", ""); // 获取 class 值将已经存在的 done 删除
                element.className = baseCls + " " + i.substr(1) + "_animate_init"; // 设置 init
            }
            isSetAnimateDone = true
        } else {
            // 将所有的 animateEls 从 init 切换至 done
            for (let i of animateEls) {
                let element = document.querySelector(i),
                    baseCls = element.className;
                element.className = baseCls.replace("_animate_init", "_animate_done"); // 将 init 设置为 done
            }
            isSetAnimateDone = false
        }
    }
}

setScreenAnimate(".screen01");
setScreenAnimate(".screen02");
setScreenAnimate(".screen03");
setScreenAnimate(".screen04");
setScreenAnimate(".screen05");