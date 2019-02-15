/*
* @Author: Marte
* @Date:   2018-11-16 21:23:24
* @Last Modified by:   Marte
* @Last Modified time: 2018-11-16 21:32:36
*/

// 内容开始
    var allproduct=document.getElementById("allproduct");
    var filter=document.getElementsByClassName("filter")[0];
    var ul=filter.getElementsByTagName("ul")[0];
    var li=ul.getElementsByTagName("li");
    var filter_bar=filter.getElementsByClassName("filter-bar")[0];
    var liB=li[0].getElementsByTagName("a")[0];
    var liA=li[1].getElementsByTagName("a")[0];
    li[0].onmouseover=function(){
        filter_bar.style.left="0";
        filter_bar.style.width=this.style.width;
        liA.style.color="#333";
        liB.style.color="#e4393c";
    }
    li[1].onmouseover=function(){
        filter_bar.style.left="107px";
        filter_bar.style.width=this.style.width;
        liA.style.color="#e4393c";
        liB.style.color="#333";
    }

// 正文开始
    var cartMain=document.getElementsByClassName("cart-main")[0];
    var list=cartMain.getElementsByClassName("cart-list")[0];
    var product=document.getElementsByName("product");
    var items=list.getElementsByClassName("item-list");
    var itxt=document.getElementsByName("itxt")[0];
    var sum_price=document.getElementsByClassName("sum-price")[0];
    var select=document.getElementsByClassName("select");
    allproduct.innerText=select.length;
        var allSelect=document.getElementsByName("allSelect");
//商店
    var shop=document.getElementsByName("shop");
    for(var i=0;i<shop.length;i++){
        shop[i].onclick=function(){
            var count=0;
            var shopNum=this.parentNode.parentNode.getElementsByClassName("select");
            if(this.checked==true){
                for(var j=0;j<shopNum.length;j++){
                    shopNum[j].checked=true;
                    shopNum[j].parentNode.parentNode.style.backgroundColor="#fff4e8";
                }
                for(var z=0;z<shop.length;z++){
                    if(shop[z].checked==true){
                        count++
                    }
                }
                if(count==shop.length){
                    for(var aa=0;aa<allSelect.length;aa++){
                    allSelect[aa].checked=true;
                    }
                }
            }
            if(this.checked==false){
                for(var j=0;j<shopNum.length;j++){
                    shopNum[j].checked=false;
                    shopNum[j].parentNode.parentNode.style.backgroundColor="#fff";
                }
                for(var aa=0;aa<allSelect.length;aa++){
                    allSelect[aa].checked=false;
                    }
            }
            sumMoney();
        }
    }

    for(var c=0;c<select.length;c++){
        select[c].onclick=function(){
            this.parentNode.parentNode.style.backgroundColor="#fff4e8";
            var shopProduct=this.parentNode.parentNode.parentNode.getElementsByClassName("product");
            var items=this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("item-list");
            var count=0,icount=0;
            if(this.checked==false){
                this.parentNode.parentNode.style.backgroundColor="#fff";
                for(var j=0;j<allSelect.length;j++){
                    allSelect[j].checked=false;
                }
                this.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.checked=false;
            }
            for(var i=0;i<shopProduct.length;i++){
               if(shopProduct[i].firstElementChild.firstElementChild.checked==true){
                count++
               }
            }
            if(count==shopProduct.length){
                this.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.checked=true;
            }
            for(var j=0;j<items.length;j++){
                if(items[j].firstElementChild.firstElementChild.checked==true){
                    icount++;
                }
            }
            if(icount==items.length){
                for(var x=0;x<allSelect.length;x++){
                    allSelect[x].checked=true;
                }
            }
        sumMoney();
        }
    }

//全选
    for(var a=0;a<allSelect.length;a++){
        allSelect[a].onclick=function(){
            if(this.checked==true){
                for(var i=0;i<select.length;i++){
                    select[i].checked=true;
                    select[i].parentNode.parentNode.style.backgroundColor="#fff4e8";
                }
                for(var j=0;j<shop.length;j++){
                    shop[j].checked=true;
                }
                for(var z=0;z<allSelect.length;z++){
                    allSelect[z].checked=true;
                }
            }
            if(this.checked==false){
                for(var i=0;i<select.length;i++){
                    select[i].checked=false;
                     select[i].parentNode.parentNode.style.backgroundColor="#fff";
                }
                for(var j=0;j<shop.length;j++){
                    shop[j].checked=false;
                }
                for(var z=0;z<allSelect.length;z++){
                    allSelect[z].checked=false;
                }
            }
            sumMoney();
        }
    }
//商品

//总价固定条
var float_bar=document.getElementsByClassName("float-bar")[0];
window.onscroll=function(){
    if(getScrolloffset().y<1056){
        float_bar.classList.add('fixed-bottom');
    }else{
        float_bar.classList.remove('fixed-bottom');
    }
}
function sumMoney(){
    var suma=0;
    for(var i=0;i<select.length;i++){
        if(select[i].checked){
            var jine=select[i].parentNode.parentNode.getElementsByClassName("pric")[0].innerText;
            suma+=Number(jine);
        }
    }
    document.getElementById("sum").innerHTML=suma;
}

function money(elem,num){
    var pri=Number(prevNode(elem.parentNode).children[0].innerHTML);
    nextNode(elem.parentNode).children[0].innerHTML=num*pri;
    sumMoney();
}
function sub(elem){
    var num=Number(elem.nextElementSibling.value);
    var pri=Number(nextNode(elem.parentNode).children[0].innerHTML);
    if(elem.nextElementSibling.value==1){
        alert("商品数量必须大于0")
        return;
    }
    num--;
    nextNode(elem).value=num;
    money(elem,num);
}
function add(elem){
    var num=Number(elem.previousElementSibling.value);
    if(num>=10){
        alert("限购10件");
        return;
    }
    num++;
    prevNode(elem).value=num;
    money(elem,num);
    sumMoney();
}
function txt(elem){
    var num=Number(elem.value);
    if(num>=10){
        alert("限购10件");
        elem.value=10;
    }
    money(elem,num);
}
function del(elem){
    var delElem=elem.parentNode.parentNode;
    var stop=delElem.parentNode;
    stop.removeChild(delElem);
    if(stop.getElementsByClassName("product").length<1){
        stop.parentNode.removeChild(stop);
    }
}