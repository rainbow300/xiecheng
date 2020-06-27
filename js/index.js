window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var focus_ul = focus.querySelector('ul')
    var focus_ol = focus.querySelector('ol')
    var focus_width = focus.offsetWidth

    // 给ol自动生成小圆圈
    for (var i = 0; i < focus_ul.children.length; i++) {
        var li = document.createElement('li')
        li.setAttribute('index', i)
        focus_ol.appendChild(li)
    }
    var first = focus_ul.children[0].cloneNode(true);
    var last = focus_ul.children[focus_ul.children.length - 1].cloneNode(true);
    // 为了做轮播图，把第一张图和最后一张图复制分别放在前后
    focus_ul.insertBefore(last, focus_ul.children[0]);
    focus_ul.appendChild(first)
        // 默认第一个小圆圈是选中的
    focus_ol.children[0].classList.add('current');
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * focus_width;
        focus_ul.style.transition = 'all .3s';
        focus_ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 等着我们过渡完成之后，再去判断 监听过渡完成的事件 transitionend 
    focus_ul.addEventListener('transitionend', function() {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // console.log(index);
            // 去掉过渡效果 这样让我们的ul 快速的跳到目标位置
            focus_ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * focus_width;
            focus_ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            focus_ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * focus_width;
            focus_ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3. 小圆点跟随变化
        // 把ol里面li带有current类名的选出来去掉类名 remove
        focus_ol.querySelector('.current').classList.remove('current');
        // 让当前索引号 的小li 加上 current   add
        focus_ol.children[index].classList.add('current');
    });
    // 给图片设置move事件
    var startX = 0;
    var moveX = 0;
    var flag = false;
    focus_ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    focus_ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * focus_width + moveX;
        focus_ul.style.transition = 'none';
        focus_ul.style.transform = 'translateX(' + translatex + 'px)';
        e.preventDefault()
        flag = true;
    })
    focus_ul.addEventListener('touchend', function(e) {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * focus_width;
                focus_ul.style.transition = 'all .3s';
                focus_ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -index * focus_width;
                focus_ul.style.transition = 'all .1s';
                focus_ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        clearInterval(timer)
        timer = setInterval(function() {
            index++;
            var translatex = -index * focus_width;
            focus_ul.style.transition = 'all .3s';
            focus_ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    })

    // 返回顶部
    var goback = document.querySelector('.goback');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (this.pageYOffset >= nav.offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
        goback.addEventListener('click', function() {
            window.scroll(0, 0);
        })
    })
})