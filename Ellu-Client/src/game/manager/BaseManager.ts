import CommandChannel from '../controller/CommandChannel';
/**
 * 管理器的基类，主要实现管理器的初始化，
 * 销毁等基本操作
 * @author jwd
 */
export default class BaseManager 
{
	protected  channel:CommandChannel;
	public constructor(channel:CommandChannel = null)
	{
		this.channel = channel;
	}

	public  init():void {
	}
	
	public  destroy():void {
		
	}
}