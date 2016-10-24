/**
 * Created by xiao lei on 2016/8/18.
 */
function Banner(id){
    this.oBox=document.getElementById(id);
    this.oBoxInner=this.oBox.getElementsByTagName('div')[0];
    this.aA=this.oBoxInner.getElementsByTagName('a');
    this.aImg=this.oBoxInner.getElementsByTagName('img');
    this.oUl=this.oBox.getElementsByTagName('ul')[0];
    this.aLi=this.oBox.getElementsByTagName('li');
    this.title = document.getElementById('title');
    this.oSpan = this.title.getElementsByTagName('span')[0];
    this.data=null;
    this.step=0;
    this.timer=null;
    this.init();
}
Banner.prototype={
    constructor:Banner,
    init:function(){
        var _this=this;
        //4.自动播放
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove();
        },1000);
        //5.焦点自动播放
        this.bannerTip();
        //6.鼠标移入停止，移出继续
        this.overout();
        //7.点击焦点手动切换
        this.handleChange();
    },

    autoMove:function(){
        if(this.step>=this.aA.length-1){
            this.step=-1;
        }
        this.step++;
        this.setBanner();
    },
    setBanner:function(){
        for(var i=0; i<this.aA.length; i++){
            if(i===this.step){
                utils.css(this.aA[i],'zIndex',1);
                animate(this.aA[i],{opacity:1},500,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        animate(siblings[i],{opacity:0});
                    }
                });
                this.oSpan.innerHTML = this.aA[i].getAttribute('realTxt');
                continue;
            }
            utils.css(this.aA[i],'zIndex',0);
        }
        this.bannerTip();
    },
    bannerTip:function(){
        for(var i=0; i<this.aLi.length; i++){
            this.aLi[i].className=i==this.step?'on':null;
        }
    },
    overout:function(){
        var _this=this;
        this.oBox.onmouseover=function(){
            clearInterval(_this.timer);
        };

        this.oBox.onmouseout=function(){
           _this.timer=setInterval(function(){
               _this.autoMove();
           },1000)
        };

    },
    handleChange:function(){
        var _this=this;
        for(var i=0; i<this.aLi.length; i++){
            this.aLi[i].index=i;
            this.aLi[i].onclick=function(){
                _this.step=this.index;
                _this.setBanner();
            }
        }
    },

}