import Controller from "./Controller";
import CommandChannel from "./CommandChannel";
import ConstName from "../ConstName";
import LoadManager from "../manager/LoadManager";
import JsonConfig from "../JsonConfig";
import GameGlobal from "../GameGlobal";

    export default class LoadController extends Controller{
        private _firstLoadList: any = [];
        public constructor(channel:CommandChannel) {
            super(channel);
            this.addCommand(ConstName.LOAD_ADD_TO_LOAD_LIST,this,this.addToLoadList);
            this.addCommand(ConstName.LOAD_START_LOAD,this,this.startLoad);
            this.startLoad();
        }

        /**初始加载的资源都放在这里 */
        private startLoad():void {
            this._firstLoadList.push({ url: LoadManager.getUrl("configJson.json",GameGlobal.JSON), type: Laya.Loader.JSON });
            Laya.loader.load(this._firstLoadList,new Laya.Handler(this,this.loadComplete));  
            // if(Laya.Browser.onWeiXin) {
            //     this._firstLoadList.push({ url: LoadManager.getUrl("./configJson.json"), type: Laya.Loader.JSON });
            //     Laya.loader.load(this._firstLoadList,new Laya.Handler(this,this.loadComplete));   
            // } else {
            //     var script:any = Laya.Browser.document.createElement("script");
            //     script.src = LoadManager.getUrl("./newFightJson.js");
            //     script.onload = function():void {
            //         JsonConfig.ins.initJson();
            //     }
            //     script.onerror = function():void
            //     {
            //         alert("配置文件加载错误，请刷新重试");
            //     }
            //     Laya.Browser.document.body.appendChild(script);
            // }
        }

        /**加入资源到加载列表 */
        private addToLoadList(data:any):void {
            if(data.length > 0){
                for(var dataStr in data) {
                    this._firstLoadList.push(data[dataStr]);
                }
            }else
                this._firstLoadList.push(data);
        }
        
        private loadComplete():void {
            window["configJson"] = LoadManager.getRes("configJson.json",GameGlobal.JSON);
            JsonConfig.ins.initJson();
            // GameEvent.ins.event(ConstName.FIRST_LOAD_COMPLETE);
        }
    }