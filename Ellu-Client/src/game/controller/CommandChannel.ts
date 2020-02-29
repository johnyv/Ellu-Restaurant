import ConstName from "../ConstName";

import DataProxy from "../proxy/DataProxy";
import GameController from "./GameController";
import UIController from "./UIController";
import LoadController from "./LoadController";
import LayerController from "./LayerController";
import RoleController from "./RoleController";
import BattleController from "./BattleController";
import Controller from "./Controller";
import InstallationProxy from "../proxy/InstallationProxy";
export default class CommandChannel{
    private  _controllerList:Object=new Object();
    private  _dataProxyList:Object=new Object();
    private static  _instance:CommandChannel;
    public  constructor(){
        this.registerController(ConstName.GAME_CONTROLLER,new GameController(this));
        this.registerController(ConstName.UI_CONTROLLER,new UIController(this));
        this.registerController(ConstName.LOAD_CONTROLLER,new LoadController(this));
        this.registerController(ConstName.LAYER_CONTROLLER, new LayerController(this));
        this.registerController(ConstName.ROLE_CONTROLLER,new RoleController(this));
        this.registerController(ConstName.BATTLE_CONTROLLER,new BattleController(this));
        // this.registerController(ConstData.SOUND_CONTROLLER,new SoundController(this));
        // this.registerController(ConstData.APP_CONTROLLER,new AppController(this));
        this.registerDataProxy(ConstName.PROXY_INSTALLATION,new InstallationProxy(this));
        this.init();
    }

    public init():void{
        for(var controllerName in this._controllerList){
            this._controllerList[controllerName].init();
        }
        for(var dataProxyName in this._dataProxyList){
            this._dataProxyList[dataProxyName].init();
        }
    }
    
    //单例模式获取命令管线，全局唯一
    public static  get instance():CommandChannel{
        !CommandChannel._instance && (CommandChannel._instance = new CommandChannel());
        return CommandChannel._instance;
        //return CommandChannel._instance!=null?CommandChannel._instance:(CommandChannel._instance=new CommandChannel(),CommandChannel._instance);
    }

    //注册控制器，通过commmandName和具体的控制器关联
    public registerController(controllerName:number,controller:Controller):void{
        if(!this._controllerList.hasOwnProperty(controllerName)){
            this._controllerList[controllerName]=controller;
        }
    }

    //根据commandName获取控制器
    public getController(controllerName:number):Controller{
        if(this._controllerList[controllerName]){
            return this._controllerList[controllerName];
        }
        return null;
    }

    //执行命令
    public postCommand(controllerName:number,commandName:number,params:any=null):any{
        var getController:Controller=this.getController(controllerName);
        return getController!=null?getController.executeCommand(commandName,params):null;
    }

    /** 
     * 注册数据处理中心
    */
    public registerDataProxy(dataProxyName:number,dataProxy:DataProxy):void{
        if(!this._dataProxyList.hasOwnProperty(dataProxyName)){
            this._dataProxyList[dataProxyName]=dataProxy;
        }
    }

    /** 
     * 注册具体数据到数据中心
    */
    public addFuncToDataProxy(dataProxyName:string,dataName:number,func:Function,thisObj:any):void{
        var dataProxy:DataProxy=this.getDataProxy(dataProxyName);
        dataProxy&&dataProxy.addDataFunc(dataName,func,thisObj);
    }

    //根据dataProxyName获取控制器
    public getDataProxy(dataProxyName:string):DataProxy{
        if(this._dataProxyList[dataProxyName]){
            return this._dataProxyList[dataProxyName];
        }
        return null;
    }

    /** 
     * 数据改变，广播消息
    */
    public broadCastData(dataProxyName:string,dataName:number,params:any=null):any{
        var dataProxy:DataProxy=this.getDataProxy(dataProxyName);
        return dataProxy!=null?dataProxy.executeCommand(dataName,params):null;
    }
}