/*
* @Author: Marte
* @Date:   2018-08-01 15:02:56
* @Last Modified by:   Marte
* @Last Modified time: 2018-11-09 10:53:44
*/

// 将一串字符串的首字母大写，其余的小写
function caplizedFirst(str){
    var firstChar=str.charAt(0).toUpperCase();
    var restChar=str.substr(1).toLowerCase();
    return firstChar+restChar;
}

// 将一串有空格分隔的字符串每个首字母大写，其余的小写
function caplizedFirst2(str){
    var arrStr=str.split(" ");
    var newArr=[];
    for(var i=0;i<arrStr.length;i++){
        var newStr=caplizedFirst(arrStr[i]);
        newArr.push(newStr)
    }
    return newArr.join(" ")
}

// 移除数组arr中的所有值与item相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回.
function dele(target,arr){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==target){
            arr.splice(i,1);
            i=i-1;
            }
        }
        return arr;
    }
function dele2(target,arr){
    for(var i=0;i<=arr.length;i++){
        var j=arr.indexOf(target,arr);
        if(j!=-1){
            arr.splice(j,1);
            j--;
            i=j;
        }
    }
    return arr;
}
    // 打印100以内的质数
function prime_number(){
    for(var i=1;i<=100;i++){
        for(var j=2;j<=i;j++){
            if(i%j==0&&i!=j){
                break;
            }else if(i==j){
            document.write(i);
            }
        }
    }
}
    //添加监听事件兼容性方法
function addListenEvent(elem,type,handle){
        if(elem.addEventListener){
            elem.addEventListener(type,handle,false);
        }else if(elem.attachEvent){
            elem.attachEvent("on"+type,handle);
            handle.call(elem);
        } else{
            elem["on"+chlik]=handle;
        }
    }
// 阻止冒泡
        function stopBubble(e){
            if(e.stopPropagation){
                e.stopPropagation();
            } else{
                e.cancelBubble=true;
            }
        }
// 阻止默认事件的方法
        function cancelEvent(e){
            e=e||window.event;
            if(e.preventDefault){
                e.preventDefault();
            } else{
                e.returnValue=false;
            }
        }

    // 寻找事件源
        function targetEvent(e){
            e=e||window.event;
            if(e.target){
                return e.target;
            } else{
                return e.srcElement;
            }
        }
//获取第一个子节点
function fistChildNode(elem){
   return elem.firstChild||elem.firstElementChild;
}
//获取最后一个子节点
function lastChildNode(elem){
   return elem.lastChild||elem.lastElementChild;
}

//获取前一个子节点
function prevNode(elem){
   return elem.previousElementSibling||elem.previousSibling;
}
//获取后一个子节点
function nextNode(elem){
   return elem.nextElementSibling||elem.nextSibling;
}

function insertAfter(newElem,target){
        if(target.parentElement.lastElementChild==target){
            target.parentElement.appendChild(newElem);
        } else{
            var next=target.nextElementSibling
            target.parentElement.insertBefore(newElem,next)
        }
}

//获取滚动条滚动的距离
    function getScrolloffset () {
        if(window.pageXOffset){
            return {
                x:window.pageXOffset,
                y:window.pageYOffset
            }
        } else{
            return{
                x:document.body.scrollLeft||document.documentElement.scrollLeft,
                y:document.body.scrollTop||document.documentElement.scrollTop
            }
        }
    }
//获取指定元素到页面顶部的距离
function elemPostion(elem){
    if(elem.offsetParent=='body'){
        return{
            x:elem.offsetLeft,
            y:elem.offsetTop
        }
    }else{
        return{
            x:elem.getBoundingClientRect().left,
            y:elem.getBoundingClientRect().top
        }
    }
}

//5.封装一个方法 获取元素样式的兼容方法
function getElementStyle(elem,prop){
    if(elem.currentStyle){
        return elem.currentStyle[prop];
    }else{
        return window.getComputedStyle(elem,null)[prop];
    }
}
