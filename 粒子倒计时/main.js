var canvas = document.getElementById('my');
var context = canvas.getContext('2d');
var future = new Date(2018,11,28,0,0,0).getTime();
var y = 10;
var x;
var left = 15;
var r = 4;
var r1 = 6;
var time_Arr = [];
var difference_Arr = [];
var particle_move = [];
function init(){
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    draw_all_Particle();
 };
function getTime(){
    var curT =  future - new Date().getTime();
    var obj = {
        d:parseInt(curT/1000/60/60/24),
        h:parseInt(curT/1000/60/60%24),
        m:parseInt(curT/1000/60%60),
        s:parseInt(curT/1000%60),
    };
    return obj;
}
function getNum(option){
     var obj = [
         Math.floor(option.d/10),
         Math.floor(option.d%10),
         10,
         Math.floor(option.h/10),
         Math.floor(option.h%10),
         10,
         Math.floor(option.m/10),
         Math.floor(option.m%10),
         10,
         Math.floor(option.s/10),
           Math.floor(option.s%10),
]
   return obj;
}

function draw_Num_Particle(w,h){
    var red = 255*Math.random();
    var green = 255*Math.random();
    var blue = 255*Math.random();
   context.beginPath();
   context.fillStyle='rgb('+ red +','+ green +','+ blue +')';
   context.arc(w, h,r, 0, Math.PI  * 2);
   context.fill();
   context.closePath();
}
function Creatcolor(w,h){
    var red = Math.floor(128*Math.random()) + 127;
    var green = Math.floor(128*Math.random()) + 127;
    var blue = Math.floor(128*Math.random()) + 127;
  
    this.color = 'rgb('+ red +','+ green +','+ blue +')';
    this.w = w;
    this.h = h;
    this.x = 0;
    this.y = 15;
    this.everyMove = function(){
         this.crossBorder();
         this.w += this.x;
         this.h += this.y;
    };
    this.againDraw = function(){
        context.beginPath();
        context.fillStyle=this.color;
        context.arc(this.w, this.h, r1, 0, Math.PI * 2);
        context.fill();
        context.closePath();     
    };
    this.crossBorder = function(){
        //越界
        if(this.h >= canvas.height/2 ){
            var i = particle_move.indexOf(this);
            particle_move.splice(i,1);
            
        }
        

    }
}
function findDifference(old,now){
  var newTime = [];
  for(var i = 0;i < now.length;i++){
      if(JSON.stringify(now[i]) !== JSON.stringify(old[i]) ){
          //数组中的值判断相等的简单方法
           newTime.push([now[i],i]);        
      }
}
return newTime;
};
function pushParticle(difference_Arr){
for(var i = 0;i <difference_Arr.length;i++){
    x1  = (r + 1)*14*(difference_Arr[i][1] + 1) + left*(difference_Arr[i][1] + 1);
     for(var j = 0;j < myNumber[difference_Arr[i][0]].length;j++){ 
         for(var k = 0;k < myNumber[difference_Arr[i][0]][j].length;k++){
             if(myNumber[difference_Arr[i][0]][j][k] == 1){
                particle_move.push(new Creatcolor(x1 + k*2*(r + 1)+(r + 1),y + j*2*(r + 1) + (r + 1)));
               if(particle_move.length >= 300){
                   //页面中粒子最多的限制，不能太少，否则数字改变多的时候
                   //因为天、小时在前面，所以它们如果改变会先存入数组中
                   //这时分、秒经后存入数组中，如果限制的太少，会将前边的
                   //也就是天或者小时的活动粒子删掉
                   particle_move.shift();
               }         
             }
         }
     }
}
};
function particleMove(){
for(var i = 0;i < particle_move.length;i++){
   particle_move[i].againDraw();
   particle_move[i].everyMove();
   
}
};
function draw_all_Particle(){
    context.clearRect(0, 0, canvas.width, canvas.height);   
    var curNumber_Arr = getNum(getTime());
    time_Arr.push(curNumber_Arr);
    if(time_Arr.length > 2){
        time_Arr.shift();
    };
    //判断时间是否相等
    if(time_Arr.length == 2){
        difference_Arr = findDifference(time_Arr[0],time_Arr[1]);      
            pushParticle(difference_Arr);    
           particleMove();    
    };     
         for(var i = 0;i < curNumber_Arr.length;i++){
          
                x = (r + 1)*14*(i + 1) + left*(i + 1);  
            
             
                
       for(var j = 0;j < myNumber[curNumber_Arr[i]].length;j++){
          for(var k = 0;k < myNumber[curNumber_Arr[i]][j].length;k++){             
              if(myNumber[curNumber_Arr[i]][j][k] == 1){                 
                     draw_Num_Particle(x + k*2*(r + 1)+(r + 1),y + j*2*(r + 1) + (r + 1));                
              }
          }
       }
    }   
    setTimeout(draw_all_Particle,20);
 };
init();

