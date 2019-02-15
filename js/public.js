/*
* @Author: Marte
* @Date:   2018-11-09 12:26:30
* @Last Modified by:   Marte
* @Last Modified time: 2018-11-17 10:30:31
*/

'use strict';
function selector(sel,brand){
    var selector=document.getElementById(sel);
    var ulList=selector.getElementsByClassName("listUl")[0];
    var li=ulList.getElementsByTagName("li");
    var more=ulList.getElementsByClassName("more");
    var select=ulList.getElementsByClassName("select");
    var cancel=ulList.getElementsByClassName("cancel");
    var check=document.getElementsByName(brand);
    var bottom=selector.getElementsByClassName("bottom")[0];
    var text=bottom.getElementsByClassName("text")[0];
    text.onclick=function(){
        if(this.innerText!="收起"){
            for(var j=5;j<li.length;j++){
                li[j].style.display="block";
            }
            this.innerText="收起";
        }else{
            for(var w=5;w<li.length;w++){
                li[w].style.display="none";
            }
            this.innerText="      更多选项（ 领型、主要材质、适用人群 等）";
        }
    }
    for(var i=0;i<li.length;i++){
        if(parseInt(getElementStyle(li[i].children[1],"height"))<=34){
            li[i].children[2].children[0].style.visibility="hidden";
        }
    }
    more[0].onclick=function(){
        if(this.innerText=="更多"){
            this.innerText="收起";
            this.parentNode.parentNode.style.height="auto";
        }else{
            this.innerText="更多";
            this.parentNode.parentNode.style.height=66+"px";
        }
    }
    for(var m=1;m<more.length;m++){
        more[m].onclick=function(){
            if(this.innerText=="更多"){
                this.innerText="收起";
                this.parentNode.parentNode.style.height="auto";
            }else{
                this.innerText="更多";
                this.parentNode.parentNode.style.height=34+"px";
            }
        }
    }
    for(var s=0;s<select.length;s++){
        select[s].onclick=function(){
            this.parentNode.parentNode.classList.add('moreSel');
            this.parentNode.parentNode.style.height="auto";
            this.parentNode.previousElementSibling.lastElementChild.style.display="block";
        }
    }
    cancel[0].onclick=function(){
        this.parentNode.parentNode.parentNode.classList.remove('moreSel');
        this.parentNode.parentNode.parentNode.style.height=66+"px";
    }
    for(var c=1;c<cancel.length;c++){
        cancel[c].onclick=function(){
            this.parentNode.parentNode.parentNode.classList.remove('moreSel');
            this.parentNode.parentNode.parentNode.style.height=34+"px";
        }
    }
    for(var a=0;a<check.length;a++){
        check[a].onclick=function(){
            if(this.checked){
                this.parentNode.parentNode.lastElementChild.firstElementChild.classList.remove("disabled");
            this.parentNode.parentNode.lastElementChild.firstElementChild.classList.add("confirm");
            }else{
                this.parentNode.parentNode.lastElementChild.firstElementChild.classList.remove("confirm");
            this.parentNode.parentNode.lastElementChild.firstElementChild.classList.add("disabled");
            }

        }
    }
}
function magnifying(pre){
    var preview=document.getElementsByClassName(pre)[0];
    var box=preview.getElementsByClassName("box")[0];
    var li=preview.getElementsByTagName("li");
    var small=box.getElementsByClassName("small")[0],move=small.getElementsByClassName("move")[0],big=box.getElementsByClassName("big")[0],smallImg=small.getElementsByTagName("img")[0],bigImg=big.getElementsByTagName("img")[0];
    small.onmouseover=function(){
        move.style.display="block";
        big.style.display="block";
    }
    small.onmouseout=function(){
        move.style.display="none";
        big.style.display="none";
    }
    small.onmousemove=function(e){
        e=e||window.event;
        var x=e.clientX-smallImg.getBoundingClientRect().left-move.offsetWidth/2;
        var y=e.clientY-smallImg.getBoundingClientRect().top-move.offsetHeight/2;
        if(x<0){
            x=0;
        }
        if(x>smallImg.offsetWidth-move.offsetWidth){
            x=smallImg.offsetWidth-move.offsetWidth
        }
        if(y<0){
            y=0;
        }
        if(y>smallImg.offsetHeight-move.offsetHeight){
            y=smallImg.offsetHeight-move.offsetHeight
        }
        move.style.left=x+"px";
        move.style.top=y+"px";
        var scale=bigImg.width/smallImg.width;
        bigImg.style.left="-"+x*scale+"px";
        bigImg.style.top="-"+y*scale+"px";
    }
    for(var i=0;i<li.length;i++){
        li[i].index=i;
        li[i].onmouseover=function(){
            for(var j=0;j<li.length;j++){
                li[j].setAttribute("class","");
            }
        this.setAttribute("class","img-hover");
        smallImg.src=this.getElementsByTagName("img")[0].src;
        var index=this.index+1
        bigImg.src="../imgs/big"+index+".jpg";
        }
    }
}
function wfLunbo(banner){
    var banner=document.getElementById(banner);
    var ul=banner.getElementsByTagName("ul")[0];
    var li=ul.getElementsByTagName("li");
    var pageNav=banner.getElementsByClassName("bannerNav")[0],leftBtn=banner.getElementsByClassName("leftBtn")[0],rightBtn=banner.getElementsByClassName("rightBtn")[0],n=0,index=0,timerElem=null,state=false;
    for(var i=0;i<li.length;i++){
        var pageA=document.createElement("a");
        if(i==0){
            pageA.className="cur";
        }
        pageNav.appendChild(pageA);
    }
    pageNav.addEventListener('click',pageNavClick,false);
    function pageNavClick(e){
        if(state){
            return;
        }
        e=e||window.event;
        for(var i=0;i<li.length;i++){
            if(pageNav.children[i]==e.target){
                index=n;
                var offset=i-n;
                n=i;
                showBtn(n);
                if(offset>0){
                    showImg(-100);
                }else{
                    showImg(100);
                }
            }
        }
    }
    function showBtn(index){
        for(var z=0;z<li.length;z++){
            pageNav.children[z].className="";
        }
        pageNav.children[index].className="cur";
    }
    function showImg(offset){
        clearInterval(timerElem);
        var speed=offset/20;
        timerElem=setInterval(function(){
            state=true;
            if(parseInt(li[n].style.left)==0){
                state=false;
                clearInterval(timerElem);
                li[n].style.left="0";
                for(var l=0;l<n;l++){
                    li[l].style.left="-100%"
                }
                for(var r=n+1;r<li.length;r++){
                    li[r].style.left="100%";
                }
            }else{
                li[n].style.left=parseInt(li[n].style.left)+speed+"%";
                li[index].style.left=parseInt(li[index].style.left)+speed+"%";
            }
        },50)
    }
    leftBtn.onclick=function(){
        if(state){
            return;
        }
        index=n;
        n--;
        if(n<0){
            n=li.length-1;
            li[n].style.left="-100%";
        }
        showBtn(n);
        showImg(100);
    }
    rightBtn.onclick=function(){
        if(state){
            return;
        }
        index=n;
        n++;
        if(n>li.length-
            1){
            n=0;
            li[n].style.left="100%";
        }
        showBtn(n);
        showImg(-100);
    }
    var timer;
    timer=setInterval(autoLunbo,2000);
    function autoLunbo(){
        rightBtn.onclick();
    }
    banner.onmouseover=function(){
        clearInterval(timer);
    }
    banner.onmouseout=function(){
        timer=setInterval(autoLunbo,2000);
    }
}
function zyLunbo(banner){
    var banner=document.getElementById(banner);
    var ul=banner.getElementsByTagName("ul")[0];
    var li=ul.getElementsByTagName("li");
    var pageNav=banner.getElementsByClassName("bannerNav")[0];
    var leftBtn=banner.getElementsByClassName("leftBtn")[0];
    var rightBtn=banner.getElementsByClassName("rightBtn")[0];
    var n=0,timerElem,animate=false;
    for(var i=0;i<li.length-2;i++){
        var pageA=document.createElement("a");
        if(i==0){
            pageA.className="cur";
        }
        pageNav.appendChild(pageA);
    }
    pageNav.addEventListener('click',pageNavClick,false);
    function pageNavClick(e){
        e=e||window.event;
        for(var j=0;j<li.length-2;j++){
            if(pageNav.children[j]==e.target){
                var offset=(j-n)*(-100);
                btnShow(j);
                n=j;
                showImg(offset);
            }
        }
    }
    function btnShow(index){
        for(var a=0;a<li.length-2;a++){
            pageNav.children[a].className="";
        }
        pageNav.children[index].className="cur";
    }
    function showImg(offset){
        clearInterval(timerElem);
        var speed=offset/20;
        var newLeft=parseInt(ul.style.left)+offset;
        timerElem=setInterval(function(){
            if(parseInt(ul.style.left)==newLeft){
                clearInterval(timerElem);
                if(n==0){
                        ul.style.left="-100%";
                    }else if(n==li.length-3){
                        ul.style.left=(-100)*(li.length-2)+"%";
                    }else{
                        ul.style.left=newLeft+"%";
                    }
                animate=false;
            } else{
                animate=true;
                 ul.style.left=parseInt(ul.style.left)+speed+"%";
            }
        },50)
    }
    rightBtn.onclick=function(){
        if(animate){
            return;
        }
        n++;
        if(n>=li.length-2){
            n=0;
        }
        btnShow(n);
        showImg(-100);
    }
    leftBtn.onclick=function(){
        if(animate){
            return;
        }
        n--;
        if(n<0){
            n=li.length-3;
        }
        btnShow(n);
        showImg(-100);
    }
    var timer=setInterval(autoLunbo,3000);
    function autoLunbo(){
        rightBtn.onclick();
    }
    banner.onmouseover=function(){
        clearInterval(timer);
    }
    banner.onmouseout=function(){
        timer=setInterval(autoLunbo,3000);
    }
}
function comment(obj,arr){
        var stars=document.getElementsByClassName(obj)[0];
        var ele=stars.getElementsByTagName("i");
        var clickIndex=0;
        var num=0;
        for(var i=1;i<=ele.length;i++){
            ele[i-1].index=i;
            ele[i-1].onmouseover=function(e){
                show(this.index);
            }
            ele[i-1].onmouseout=function(){
                show(0);
            }
            ele[i-1].onclick=function(){
                clickIndex=this.index;
                show(clickIndex);
            }
        }
        function show(index){
            num=index||clickIndex;
            for(var j=0;j<ele.length;j++){
                ele[j].className=(j<num)?"cur":"star";
                if(num==1||num==2){
                    ele[j].style.color="#666"
                } else if(num==3||num==4){
                    ele[j].style.color="orange";
                } else{
                    ele[j].style.color="red";
                }
            }
            stars.getElementsByTagName("em")[0].innerText=num>0?arr[num-1]:"";
        }
}