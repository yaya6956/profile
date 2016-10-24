/*** Created by yaya on 16/9/15.*/
/*搜索框*/
searInp('t1','search','down-list','a')
searInp('t12','search2','down-list2','a')
function searInp(id1,id2,id3,tagName1){
    var oT=document.getElementById(id1);
    var oSearch=document.getElementById(id2);
    var oUl=document.getElementById(id3);
    var aA=oUl.getElementsByTagName(tagName1);
    var n=-1;
    var oldValue=null;
    function search(){
        window.open('https://www.baidu.com/s?wd='+oT.value,'_self');
        oT.value='';
    }
    oT.onkeyup=oT.onfocus=function(){
        var str=this.value.replace(/(^ +)|( +$)/g,'');
        oUl.style.display=str?'block':'none';
    };
    document.body.onclick=function(e){
        var tar =  e.target|| e.srcElement,
            tarTag = tar.tagName.toUpperCase(),
            tarParent = tar.parentNode,
            tarGrandpa = tarParent.parentNode;

        if(tar.id=='t1'){
            return;
        }
        if(tarTag=='a'&& tarGrandpa.id==='down-list'){
            oT.value=e.target.innerHTML;
        }
        if(tar.id=='search'){
            search();
        }
        oUl.style.display='none';
    };
    oT.onkeydown=function(e){
        e=e||window.event;
        if(e.keyCode==40){
            n++;
            if(n>=aA.length){
                n=-1;
            }
            list();
        }
        if(e.keyCode==38){
            n--;
            if(n<=-2){
                n=aA.length-1;
            }
            list();

        }
        if(e.keyCode==13){
            search();
        }
        function list(){
            if(!oldValue){
                oldValue=oT.value;
            }
            for(var i=0; i<aA.length; i++){
                aA[i].style.background='';
            }
            if(n==-1){
                oT.value=oldValue;
            }else{
                aA[n].style.background='#e1e1e1';
                oT.value=aA[n].innerHTML;
            }
        }
    }
}

/*滑动的浮层**/
function scrollBlo(){
    var conWrap = document.getElementById('con-wrap');
    var aAs = conWrap.getElementsByTagName('a');
    for(var i = 0;i<aAs.length;i++){
        var oA = aAs[i];
        (function(index){
            var oP = utils.getChildren(aAs[index],'p');
            oA.onmouseover = function(){
                try{
                    animate(oP[0],{bottom:-1},300);
                    var cliflg = true;
                    var oI = utils.getChildren(oP[0],'i');
                    oP[0].onclick = function(){
                        if(cliflg){
                            oI[0].style.backgroundPositionX = '-23px';
                            cliflg = false;
                        }else{
                            oI[0].style.backgroundPositionX = '0px';
                            cliflg = true;
                        }
                    }

                }catch(e){}
            };
            oA.onmouseout = function(){
                try{
                    animate(oP[0],{bottom:-30},300);
                }catch(e){}
            }
        })(i)
    }
}
scrollBlo('con-wrap','a','p');
/*function scrollBlo(id1,tagName1,tagName2){
 var conWrap = document.getElementById(id1);
 var aAs = conWrap.getElementsByTagName(tagName1);
 var oP = conWrap.getElementsByTagName(tagName2);
 for(var i = 1;i<aAs.length-1;i++){
 var oA = aAs[i];
 if(aAs.length===oP.length){
 (function(index){
 oA.onmouseover = function(){
 animate(oP[index],{bottom:-1},300);
 };
 oA.onmouseout = function(){
 animate(oP[index],{bottom:-30},300);
 }
 })(i)
 return;
 }
 (function(index){
 oA.onmouseover = function(){
 animate(oP[index-1],{bottom:-1},300);
 }
 oA.onmouseout = function(){
 animate(oP[index-1],{bottom:-30},300);
 }
 })(i)
 }
 }*/

/*收缩模块*/
toggleBlo('setBtn','setBlock','closeBtn');
toggleBlo('searchAddEx','searchAddExt');
toggleBlo('searchSet','searchSetHid');
toggleBlo('editor','searchAddExt');

function toggleBlo(id1,id2,id3){
    var setBtn = document.getElementById(id1);
    var setBlock = document.getElementById(id2);
    var closeBtn = document.getElementById(id3);
    var flag = true;
    setBtn.onclick = function(e){
        var tar = e.target || e.srcElement,
            tagName = tar.tagName.toUpperCase(),
            tarParent = tar.parentNode,
            tarGrandpa = tarParent.parentNode;

        if((tagName==='A' && tarParent.id==='editor')||tagName==='LI' && tar.id==='editor'){
            if(tagName==='A'){
                tar = tarParent;
            }
            setBlock.style.display = 'block';
            tarGrandpa.style.display = 'none';
            utils.siblings(tarGrandpa)[2].style.display ='none';
            utils.prev(tarGrandpa).style.background = 'url("images/p1-search-back.png") no-repeat 0px 4px';
            /*var comPar = utils.getByClass('h-blo');*/
            /*var aLis = ;*/
            var thirdAngle = document.getElementById('thirdAngle');
            thirdAngle.style.display = 'none';
        }
        if(tagName=='A' && tarParent.id=='searchAdd'){
            if(flag){
                setBlock.style.display = 'none';
                return;
            }
            setBlock.style.display = 'block';
        }

        if(flag){
            setBlock.style.display = 'block';
            if(this.innerHTML==='展开（23）'){
                this.innerHTML='收起（23）';
            }
            try{
                closeBtn.onclick = function(){
                    setBlock.style.display = 'none';
                    flag = true;
                };
            }catch(e){}

            flag = false;
        }else{
            setBlock.style.display = 'none';
            if(this.innerHTML==='收起（23）'){
                this.innerHTML='展开（23）';
            }
            flag = true;
        }


    };
}

/*设置body背景*/
function setBodyBg(){
    var body = document.getElementById('body');
    var pageBg = document.getElementById('pageBg');
    var aLis = pageBg.getElementsByTagName('li');
    aLis[0].onclick = function(){
        body.style.background ='#f5f5f5';
    };
    for(var i = 1;i<aLis.length-1;i++){
        var oLi = aLis[i];
        oLi.onclick = function(){
            body.style.background = 'url("'+this.getAttribute('realBg')+'")';
        }

    }
}
setBodyBg();

/*滑动轮播*/
scrollBanner('sheavesMain','div','page','footerWrap','ul','li')
function scrollBanner(id1,tagName1,tagName2,id2,tagName3,tagName4){
    var oMain=document.getElementById(id1);
    //var pAllTab=document.getElementById('pAll-Tab');
    var oBoxInner=oMain.getElementsByTagName(tagName1)[0];
    var aDiv=utils.getByClass(oBoxInner,tagName2);
    var footerWrap = document.getElementById(id2);
    var oUl2=footerWrap.getElementsByTagName(tagName3)[0];
    var aLi=oUl2.getElementsByTagName(tagName4);
    var step=0;//step这个值，都决定了让哪个页面显示；
    var isWheeling=false;
    var ch=utils.win('clientWidth');
//1.让所有的page都加上可视区的高度；
    for(var i=0; i<aDiv.length; i++){
        aDiv[i].style.width=ch+'px';
    }
    function changePage(){
        animate(oBoxInner,{left:-step*ch},300)
    }
    for(var i=0; i<aLi.length-1; i++){
        /*aLi[i].className=i==step?'on':null;*/
        var oLiBan = aLi[i];
        oLiBan.index = i;
        oLiBan.onclick = function(){
            step = this.index;
            animate(oBoxInner,{left:-step*ch},300)
        }
    }
    wheel(document,function(bOk){
        if(bOk){
            if(isWheeling) return;
            if(step>=aDiv.length-1){
                alert('到底了')
                return;
            }
            //pAllTab.style.visibility = (step==0||step==1)?'hidden':'visible';
            step++;
        }else{
            if(isWheeling) return;
            if(step<=0){
                // step=aDiv.length-1;
                alert('到头了')
                return;
            }
            //pAllTab.style.display = (step==3||step==2)?'none':'block';
            step--;
        }
        isWheeling=true;
        clearTimeout(document.timer)
        document.timer=setTimeout(function(){
            isWheeling=false;
        },600);
        changePage();
    });
}

/*选项卡*/
changeCars('p4rT','p4tTabT','span','tab-in','select');
changeCars('p4rT2','p4tTabT2','span','tab-in','select');
changeCars('p5cT','p5tTabT','span','p5-tab-in','select');
function changeCars(id1,id2,tagName1,tagName2,className){
    var oTicket=document.getElementById(id1);
    var oMovie_ticket=document.getElementById(id2);
    var aSpan=oMovie_ticket.getElementsByTagName(tagName1);
    var aDiv=utils.getByClass(oTicket,tagName2);
    for(var i=0;i<aSpan.length;i++){
        (function(index){
            aDiv[0].style.display='block';

            aSpan[index].onmouseover=function(){
                for(var i=0;i<aSpan.length;i++){
                    aSpan[i].className='';
                    aDiv[i].style.display='none';
                }
                aSpan[index].className=className;
                aDiv[index].style.display='block';
            }
        })(i)
    }
}













