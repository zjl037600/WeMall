function ValidatePhone(p) {
    var partten = /^1[3,4,5,7,8]\d{9}$/;
    if (!partten.exec(p)) {
        try {
            return ValidateOverseasPhone(p);
        } catch (e) {
            return false;
        }
    }
    return true;
}
//海外电话验证，不太准
function ValidateOverseasPhone(p) {
    var partten = /^(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))/
    //var partten = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
    if (!partten.exec(p)) {
        return false;
    }
    return true;
}

function ValidateSpecial(s) {
    var partten = new RegExp("[`~!@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*——|{}【】‘；：”“'。，？]")
    if (!partten.exec(s)) {
        return false;
    }
    return true;
}
/**
* 校验所有输入域是否含有特殊符号
* 所要过滤的符号写入正则表达式中，注意，一些符号要用'\'转义.
* 试例：
* if(checkAllTextValid(document.forms[0]))
* alert("表单中所有文本框通过校验！");
*/
function checkAllTextValid(form) {
    //记录不含引号的文本框数量
    var resultTag = 0;
    //记录所有text文本框数量
    var flag = 0;
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].type == "text") {
            flag = flag + 1;
            //此处填写所要过滤的特殊符号
            //注意：修改####处的字符，其它部分不许修改.
            //if(/^[^####]*$/.test(form.elements[i].value))

            if (/^[^\|"'<>]*$/.test(form.elements[i].value))
                resultTag = resultTag + 1;
            else
                form.elements[i].select();
        }
    }

    /**
    * 如果含引号的文本框等于全部文本框的值，则校验通过
    */
    if (resultTag == flag)
        return true;
    else {
        return false;
    }
}
window.onload = function () {
    if (document.referrer.indexOf(location.pathname) == -1) {
        localStorage.ref = document.referrer;
        localStorage.reftime = -1;
    } else {
        localStorage.reftime--;
    }
}
function back() {
    history.go(localStorage.reftime);
}
function imgerr(obj) {
    obj.src = "/moban/default/img/goods_loading.gif";
}