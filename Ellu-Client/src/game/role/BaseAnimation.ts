export default class BaseAnimation extends Laya.Animation {
    public _prefix: string;
    public constructor() {
        super();
    }

    /**
     * 创建一组动画的url数组（美术资源地址数组）
     * @param aniName  动作的名称，用于生成url
     * @param length   动画最后一帧的索引值，
     */
    protected aniUrls(aniName: string, length: number): string[] {
        var urls: string[] = [];
        for (var i: number = 0; i < length; i++) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push(this._prefix + aniName + "_" + i + ".png")
        }
        return urls;
    }
}