import BaseVo from "./BaseVo";
import InstallationListItemVo from "./InstallationListItemVo";

export default class MenuVo extends BaseVo {
    //设施列表
    public menuList: Array<InstallationListItemVo>;
    //设施信息
    public menuInfo: Object;
    //属性配置信息
    public propertype:Object;

    public constructor() {
        super();
    }

    public init(jsonObj: any): void {
        this.menuList = this.decodeList(jsonObj.menuList);
        this.menuInfo = jsonObj.menuInfo;
        this.propertype = jsonObj.propertype;
    }

    private decodeList(itemList:any):Array<InstallationListItemVo>{
        let InstallationVoList: Array<InstallationListItemVo> = [];
        for(let len = itemList.length ,i = 0;i< len;i++){
            let installationVo = new InstallationListItemVo();
            installationVo.init(itemList[i]);
            InstallationVoList.push(installationVo);
        }
        return InstallationVoList;
    }
} 