import CommandChannel from "../controller/CommandChannel";
import DataProxy from "./DataProxy";

export default class InstallationProxy extends DataProxy{
    public constructor(channel:CommandChannel){
        super(channel);
    }
}