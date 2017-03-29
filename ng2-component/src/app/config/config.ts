import { environment } from '../../environments/environment';

export class AppConfig {
    // public static urlPath = "/trade-manager/";
    public urlPath = "";

    constructor() {
        this.urlPath = (<any>window).overallPath + "/";
    }
    

}

