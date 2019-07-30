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

// 定义一个对象，键是对应的屏幕，值是屏幕内有动画的元素
let screenAnimateElements = {
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

// 定义一个函数，将动画元素设置为 init
let setScreenAnimateInit = function (screenCls) {
    let screen = getElem(screenCls),
        animateElements = screenAnimateElements[screenCls];
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

// step1: 初始化 init 样式
window.onload = function () {
    for (let k in screenAnimateElements) {
        if (k === ".screen01") {
            continue;
        }
        setScreenAnimateInit(k);
    }
};

// step2: 页面滚动到哪里，动画就播放到哪里，且当高度大于 80 导航条固定、侧边导航出现，且对应导航有激活样式
let navItems = getElemAll(".header__nav-item"),
    sideNavItems = getElemAll(".sideNav__item");

// 定义一个函数，处理导航激活样式
let switchNavActive = function (index) {
    for (let i = 0; i < sideNavItems.length; i++) {
        delCls(navItems[i], "header__nav-item_status_active");
        delCls(sideNavItems[i], "sideNav__item_status_active");
    }
    addCls(navItems[index], "header__nav-item_status_active");
    addCls(sideNavItems[index], "sideNav__item_status_active");
};

switchNavActive(0);

window.addEventListener("scroll", function () {
    let top = document.documentElement.scrollTop || document.body.scrollTop;
    if (top > 80) {
        addCls(getElem(".header"), "header_status_fixed");
        addCls(getElem(".sideNav"), "sideNav_status_fixed");
    } else {
        delCls(getElem(".header"), "header_status_fixed");
        delCls(getElem(".sideNav"), "sideNav_status_fixed");
        switchNavActive(0)
    }

    if (top > 1) {
        setScreenAnimateDone(".screen01");
    }
    if (top > 600) {
        setScreenAnimateDone(".screen02");
        switchNavActive(1);
    }
    if (top > 700 * 2) {
        setScreenAnimateDone(".screen03");
        switchNavActive(2);
    }
    if (top > 700 * 3) {
        setScreenAnimateDone(".screen04");
        switchNavActive(3);
    }
    if (top > 700 * 4) {
        setScreenAnimateDone(".screen05");
        switchNavActive(4);
    }

});

// step3: 导航条与侧边导航双向定位
// 定义一个函数用以设置滚动条高度，完成跳转
let setNavJump = function (i) {
    let navItem = navItems[i],
        sideNavItem = sideNavItems[i];
    navItem.onclick = function () {
        document.body.scrollTop = i * 800;
        document.documentElement.scrollTop = i * 800;
    };
    sideNavItem.onclick = function () {
        document.body.scrollTop = i * 800;
        document.documentElement.scrollTop = i * 800;

    }
};

for (let i = 0; i < sideNavItems.length; i++) {
    setNavJump(i);
}

// step4: 导航条滑动门特效
let navTip = getElem(".header__nav-tip");
let setTip = function (index) {
    navItems[index].onmouseover = function () {
        navTip.style.left = (index * 82) + "px";
    };
    navItems[index].onmouseout = function () {
        for (let i = 0; i < navItems.length; i++) {
            if (getCls(navItems[i]).indexOf('header__nav-item_status_active') > -1) {
                navTip.style.left = (i * 82) + "px";
            }
        }
    };
    window.addEventListener("scroll", function () {
        for (let i = 0; i < navItems.length; i++) {
            if (getCls(navItems[i]).indexOf('header__nav-item_status_active') > -1) {
                navTip.style.left = (i * 82) + "px";
            }
        }
    });
};

for (let i = 0; i < navItems.length - 1; i++) {
    setTip(i);
}

// 自动播放第一屏动画
setTimeout(function () {
    setScreenAnimateDone(".screen01");
}, 1000);
