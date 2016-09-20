/**
 * Created by echo51 on 2016/8/27.
 */
function lubbao (parmas,callback){
    var option = {
        container:dom ,
        width: 0,
        height: 0,
        changeSpeed:600,
        speed:3000,
        img:[]
    };
    init();
    var currentImgIndex=0; //存储当前页index
    var moveController=0;//从当前页调转到目标页用到的时钟
    function init() {
        extend(option, parmas);
        addDiv();
        click();
    }
    //设置外部div的样式
    function addDiv(){
        option.container.setAttribute("style","width:"+option.width+"px;height:"+option.height+"px;position:absolute;overflow:hidden;");
        //创建img元素
        var imgst = "<div class='imgs' style='width:" + option.width * option.img.length + "px;height: " + option.height + "px;position: absolute;'></div>";
        option.container.insertAdjacentHTML("afterbegin", imgst);
        var img = option.container.querySelector(".imgs");
        var img1 = "";
        //console.log(option.img.length);
        for (var i = 0; i < option.img.length; i++) {
            img1 = img1 + "<img  style='float:left;width: "+option.width+";height: "+option.height+"px'>";
        }
        img.insertAdjacentHTML("afterbegin", img1);
        var imgs = option.container.querySelectorAll("img");
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].src = option.img[i].src;
        }
        //创建num
        var numstr = "<div class='num' style=' position: absolute;bottom: 10px;right: 10px;'></div>";
        option.container.insertAdjacentHTML("beforeEnd", numstr);
        var num =option.container.querySelector(".num");
        //console.log(num);
        var numul = "<ul style='list-style-type: none;text-align: center;color: white;'></ul>";
        num.insertAdjacentHTML("beforeEnd",numul);
        var li = " ";
        for(var i =0;i<option.img.length;i++){
            li = li+"<li style='  width: 25px;height: 25px;line-height: 25px;float: left;margin-left: 5px;background-color: #f90;" +
                "opacity: 0.6;'>"+(i+1)+"</li>"
        }
        num.querySelector("ul").insertAdjacentHTML("beforeEnd",li);
    }

    /**
     * 初始化num
     */
    //changeNumber();
    /**
     *每隔3s轮播跳转一次
     * @type {number}
     */
    var imgChangrController;//每隔一段时间页面跳转一次的时钟控制器
    imgChangrController = setInterval(imgchange,option.speed);
    function imgchange(){
        var nextImgIndex = currentImgIndex+1;
//        当下一个页面的index为img的总数的时候，将nextImgIndex设为0；
        if(nextImgIndex >=option.container.querySelectorAll("img").length){
            nextImgIndex = 0;
        }
        moveToImgbyIndex2(nextImgIndex);
    }
//         /**
//          * 轮播页面由当前页移动到下一页
//          * @param index
//          */
    function moveToImgbyIndex2(index){
//        clearInterval(moveCon);
        if(moveController == 0){
            //当前页面的left
            var currentImgleft  = -currentImgIndex * (option.width);
            //目标页面的left
            var nextImgLeft = -index * (option.width);
            //移动10次的step
            var step = (nextImgLeft-currentImgleft) / 10;

//            console.log(step);
            //每次移动1s，每步移动0.5/10秒
            var count = 0;
            var imgs = document.querySelector(".imgs");
            moveController  = setInterval(function(){
                currentImgleft +=step;
                imgs.style.left = currentImgleft +"px";
                count++;
                if(count > 9){
                    //停止移动
                    clearInterval(moveController);
                    moveController = 0;
//                    console.log(moveController);
                    //                  将当前页面设置为目标页面
                    currentImgIndex = index;
                    //右下角的数值改变
                    changeNumber();
                }
            },option.changeSpeed);
        }
    }
    /**
     * num改变
     * @type {Element}
     */
    function changeNumber(){
        var lis = document.querySelectorAll(".num ul li");
        for(var i = 0;i < lis.length;i++){
            var li =lis[i];
            li.style.fontWeight = 400;
            li.style.backgroundColor = "red";
        }
        var currentLi =lis[currentImgIndex];
        currentLi.style.fontWeight=600;
        currentLi.style.backgroundColor = "#f90";
    }
//         /**
//          * 添加监听事件
//          *
//          */
    option.container.onmouseover = function(){
        clearInterval(imgChangrController);
    };
    option.container.onmouseout =function(){
        imgChangrController =setInterval(imgchange,option.speed);
    };
//    监听浏览器是否最小化
    document.addEventListener("webkitvisibilitychange",function(){
        if(document.webkitVisibilityState == "hidden"){
            clearInterval(imgChangrController);
        }else {
            imgChangrController = setInterval(imgchange,option.speed);
        }
//         console.log(document.webkitVisibilityState);
        //ie:document.msVisibilityState;
        //火狐：document.mozVisibilityState;
        //chrome/safri:document.webkitVisibilityState;
    });
    //li中的点击事件
    function click(){
        var lis =option.container.querySelectorAll("li");
        for(var i =0;i<lis.length;i++){
            clearInterval(imgChangrController);
            lis[i].onclick = function(event){
                var litext = event.target.innerHTML;
                //console.log(litext-1);
                moveToImgbyIndex2(parseInt(litext)-1);
            }
        }
    }
    function extend(a, b){
        for (var key in b) {
            if (a.hasOwnProperty(key)){
                a[key] = b[key];
            }
        }
        //console.log(a);
        return a;
    }
}