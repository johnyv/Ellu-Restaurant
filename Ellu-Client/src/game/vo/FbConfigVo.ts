// public class FbConfigVo extends BaseVo{
//     //法宝名称
//     public var name:String;
//     //资源是否是动画
//     public var isAni:Boolean;
//     //初始x位置
//     public var startPosX:String;
//     //初始y位置
//     public var startPosY:String;
//     //移动位置标号
//     public var posNo:int;
//     //动画播放速度
//     public var interval:int;

//     public function FbConfigVo(){

//     }

//     override public function init(obj,jsonObj:Object):void {
//         var propNo:Number = 0;
//         name = obj[propNo++];
//         isAni = Boolean(obj[propNo++]);
//         startPosX = obj[propNo++];
//         startPosY = obj[propNo++] + "";
//         posNo = obj[propNo++];

//         interval = obj[propNo++] || 50;
//         jsonObj[name] = this;
//     }
// } 