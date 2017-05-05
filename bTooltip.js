;(function ($, win){
    'use strict';
    /**
     * [bTooltip 气泡提示组件]
     * @author zin leo
     * @version v1.0.0
     * @dependence jquery>=1.7.1
     *
     * showTip方法：需传入dom对象、文本
     * hideTip方法：无需传参
     * removeTip方法：无需传参
     * 
     * 支持链式调用
     */
     
    var bTooltip = win.bTooltip = win.bTooltip || {},
        _this = bTooltip,
        domId = "#bTooltip";

    //显示气泡
    _this.showTip = function (dom, str){
        //创建气泡
        createBubble();

        //向气泡填充内容，便于计算气泡定位
        $(domId + '>p').text(str);

        //设置气泡位置
        setTipPosition(dom);

        //显示气泡
        $(domId).fadeIn();

        return this;
    }

    //隐藏气泡
    _this.hideTip = function () {
        $(domId).hide()
        $(domId + '>p').text("");

        return this;
    }

    //删除气泡
    _this.removeTip = function () {
        $(domId).remove(domId);

        return this;
    }

    //创建气泡dom
    function createBubble () {
        var $tip = $(domId);

        //判断气泡是否已经存在
        if($tip.length <= 0) {
            var frag = document.createDocumentFragment(),
                div = document.createElement("div"),
                p = document.createElement("p"),
                span = document.createElement("span");
            
            div.setAttribute("id", "bTooltip");
            div.style.display = "none";
            div.appendChild(p);
            span.className = "left";
            div.appendChild(span);
            frag.appendChild(div);

            $("body").append(frag);
        }

        return true;
    }

    //设置气泡位置
    function setTipPosition(dom) {
        var windowHeight = $(window).height(),
            windowWidth = $(window).width(),

            scrollTop = $(document).scrollTop(),
            scrollLeft = $(document).scrollLeft(),

            //传入dom的相关位置属性
            $dom = $(dom),
            _domHight = $dom.height(),
            _domWidth = $dom.width(),
            _domOffsetLeft = $dom.offset().left,
            _domOffsetTop = $dom.offset().top,
            
            //气泡的相关位置属性
            $tip = $(domId),
            _tipHeight = $tip.height(),
            _tipWidth = $tip.width(),

            topDiff = _domOffsetTop - scrollTop + _domHight + _tipHeight,
            leftDiff = _domOffsetLeft - scrollLeft + _domWidth + _tipWidth,
            
            $arrow = $tip.find('span');
        
        //对气泡进行距离可视窗口 顶部 的定位，并设置 箭头 垂直方向位置
        if (topDiff > windowHeight) {
            $tip.css({"top" : topDiff - _domHight - _tipHeight * 2 + 'px'});
            $arrow.removeClass('top').addClass('bottom');
        } else {
            $tip.css({"top" : topDiff - _domHight - _tipHeight + 'px'});
            $arrow.removeClass('bottom').addClass('top');
        }

        //对气泡进行距离可视窗口 左侧 的定位，并设置 箭头 水品方向位置、指向方向
        if(leftDiff > windowWidth) {
            $tip.css({"left" : leftDiff - _domWidth - _tipWidth * 2 - (_domWidth / 6) + 'px'});
            $arrow.removeClass('left rotate_90').addClass('right rotate90');
        } else {
             $tip.css({"left" : leftDiff - _tipWidth + 15 + 'px'});
             $arrow.removeClass('right rotate90').addClass('left rotate_90');
        }

        return true;
    }
    
})(jQuery, window);