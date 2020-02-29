import BaseVo from "./BaseVo";
import InstallationItemVo from "./InstallationItemVo";

export default class InstallationListItemVo extends BaseVo {
    //设施名称
    public installationName: string;
    //设施类型，用来加载用，也可用来区分
    public type:string;
    //设施位置坐标
    public posArr:Array<number>;
    //设施列表
    public installationItemList: Array<InstallationItemVo>;

    public constructor() {
        super();
    }

    public init(obj:any): void {
        var propNo: number = 0;
        this.installationName = obj[propNo++];
        this.type = obj[propNo++];
        this.posArr = obj[propNo++];
        this.installationItemList = this.decode(obj[propNo++]);
    }

    private decode(itemList:Array<any>):Array<InstallationItemVo>{
        let installationItemList: Array<InstallationItemVo> = [];
        for(let len = itemList.length ,i = 0;i< len;i++){
            let installationItemVo = new InstallationItemVo();
            installationItemVo.type = this.type;
            installationItemVo.posArr = this.posArr;
            installationItemVo.init(itemList[i]);
            installationItemList.push(installationItemVo);
        }
        return installationItemList;
    }
} 