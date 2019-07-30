// 基本函数
// 获取元素
let getElem = function (selector) {
    return document.querySelector(selector);
};

let getElemAll = function (selector) {
    return document.querySelectorAll(selector);
};

// 获取元素样式
let getCls = function (elem) {
    return elem.className;
};

// 设置元素样式
let setCls = function (elem, cls) {
    return elem.className = cls;
};

// 为元素添加样式
let addCls = function (elem, cls) {
    let baseCls = getCls(elem);
    if (baseCls.indexOf(cls) === -1 && baseCls !== "") {
        setCls(elem, baseCls + " " + cls)
    } else if (baseCls === "") {
        setCls(elem, cls)
    }
};

// 删除元素样式
let delCls = function (elem, cls) {
    let baseCls = getCls(elem);
    if (baseCls.indexOf(cls) !== -1 && baseCls.indexOf(cls) !== 0) {
        baseCls = baseCls.replace(" " + cls, "");
        setCls(elem, baseCls);
    } else if (baseCls.indexOf(cls) === 0) {
        baseCls = baseCls.replace(cls, "");
        setCls(elem, baseCls);
    }
};

// 定义一个对象，键是对应的屏幕，值为屏幕内动画元素组成的数组
let screenAnimateElements = {
    ".screen01": [
        ".screen01__title",
        ".screen01__subtitle"
    ],
    ".screen02": [
        ".screen02__title",
        ".screen02__title_tip",
        ".screen02__subtitle",
        ".screen02__item_image02"
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

// 定义一个函数，将动画元素设置为 init
let setScreenAnimateInit = function (screenCls) {
    let animateElements = screenAnimateElements[screenCls];
    for (let i = 0; i < animateElements.length; i++) {
        let element = getElem(animateElements[i]);
        addCls(element, animateElements[i].substr(1) + "_animate_init");
    }
};

// 定义一个函数，将动画元素设置为 done（播放动画）
let setScreenAnimateDone = function (screenCls) {
    let animateElements = screenAnimateElements[screenCls];
    for (let i = 0; i < animateElements.length; i++) {
        let element = getElem(animateElements[i]);
        delCls(element,  animateElements[i].substr(1)+ "_animate_init");
        addCls(element, animateElements[i].substr(1) + "_animate_done" );
    }
};

// step01: 页面加载时将所有 transition 动画初始化，并自动播放第一屏动画
window.onload = function () {
    for (let k in screenAnimateElements) {
        if (k === ".screen01") {
            continue;
        }
        setScreenAnimateInit(k);
    }
};

// 将第二屏和第三屏 animation 动画初始化
let screen02Image02 = getElem(".screen02__item_image02"),
    screen02Image03 = getElem(".screen02__item_image03");

screen02Image02.addEventListener("transitionend", function () {
    if (screen02Image02.className.indexOf("done") !== -1) {
        addCls(screen02Image03, "screen02__item_image03_animate");
        screen02Image03.style.opacity = "1";
    } else {
        screen02Image03.style.opacity = "0"
    }
});

let screen03Image = getElem(".screen03__image"),
    screen03Item = getElem(".screen03__item");

screen03Image.addEventListener("transitionend", function () {
    if (screen03Image.className.indexOf("done") !== -1) {
        addCls(screen03Item, "screen03__item_animate");
        screen03Item.style.opacity = "1";
    } else {
        screen03Item.style.opacity = "0"
    }
});

// 自动播放第一屏动画
setTimeout(function () {
    setScreenAnimateDone(".screen01");
}, 1000);

// step02: 页面滚动并触发动画，同时将导航条固定并设置导航项激活状态且侧边导航弹出
let navItems = getElemAll(".header__nav__item"),
    sideNavItems = getElemAll(".sideNav__item");

let switchNavActive = function (index) {
    for (let i = 0; i < sideNavItems.length; i++) {
        delCls(navItems[i], "header__nav__item_status_active");
        delCls(sideNavItems[i], "sideNav__item_status_active");
    }
    addCls(navItems[index], "header__nav__item_status_active");
    addCls(sideNavItems[index], "sideNav__item_status_active");
};

switchNavActive(0);

window.addEventListener("scroll", function () {
    let top = document.documentElement.scrollTop || document.body.scrollTop,
        header = getElem(".header"),
        sideNav = getElem(".sideNav");
    console.log(top);

    if (top > 80) {
        addCls(header, "header_fixed");
        addCls(sideNav, "sideNav_fixed");
    } else {
        delCls(header, "header_fixed");
        delCls(sideNav, "sideNav_fixed");
        switchNavActive(0);
    }

    if (top > 300) {
        setScreenAnimateDone(".screen02");
        switchNavActive(1);
    }
    if (top > 800) {
        setScreenAnimateDone(".screen03");
        switchNavActive(2);
    }
    if (top > 1500) {
        setScreenAnimateDone(".screen04");
        switchNavActive(3);
    }
    if (top > 2100) {
        setScreenAnimateDone(".screen05")
        switchNavActive(4);
    }
});

// step03: 点击跳转
// 定义一个函数用以设置滚动条高度，完成跳转
let setNavJump = function (index) {
    let navItem = navItems[index],
        sideNavItem = sideNavItems[index];
    navItem.onclick = function () {
        document.documentElement.scrollTop = index * 640 - 80;
        document.body.scrollTop = index * 640 - 80;
    };
    sideNavItem.onclick = function () {
        document.documentElement.scrollTop = index * 640 - 80;
        document.body.scrollTop = index * 640 - 80;
    }
};

for (let i = 0; i < sideNavItems.length; i++) {
    setNavJump(i);
}

// 第六屏按钮跳转至顶部
let screen06Button = getElem(".screen06__button");
screen06Button.onclick = function () {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
};

// step04: 导航条滑动门特效
let headerNavTip = getElem(".header__nav_tip");
console.log(headerNavTip);

let setTip = function (index) {
    navItems[index].onmouseover = function () {
        headerNavTip.style.left = (index * 93) + "px";
    };
    navItems[index].onmouseout = function () {
        for (let i = 0; i < navItems.length; i++) {
            if (getCls(navItems[i]).indexOf("active") > -1 ) {
                headerNavTip.style.left = (i * 93) + "px";
            }
        }
    };
    window.addEventListener("scroll", function () {
        for (let i = 0; i < navItems.length - 1; i++) {
            if (getCls(navItems[i]).indexOf("active") > -1 ) {
                headerNavTip.style.left = (i * 93) + "px";
            }
        }
    })
};

for (let i = 0; i < navItems.length -1; i++) {
    setTip(i)
}