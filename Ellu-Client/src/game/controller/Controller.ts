import BaseManager from "../manager/BaseManager";
import CommandChannel from "./CommandChannel";

export default class Controller{
    protected  channel:CommandChannel;
    protected  commandList:Object=new Object();
    protected  managerList:Array<BaseManager> = [];
    
    public  constructor(channel:CommandChannel){
        this.channel = channel;
    }

    protected  init():void {
        for (var baseManagerName in this.managerList) {
            this.managerList[baseManagerName].init();
        }
    }
    
    //添加命令
    public  addCommand(commandName:number,caller:any,func:Function):void{
        if(!this.commandList.hasOwnProperty(commandName)){
            this.commandList[commandName]=[caller,func];
        }
    }

    //执行命令
    public  executeCommand(commandName:number,params:any):any{
        return this.commandList[commandName]!=null?this.commandList[commandName][1].call(this.commandList[commandName][0],params):null;
    }
} 