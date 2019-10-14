import { Injectable } from '@angular/core';
import * as monuments from "../../../assets/jsonData/monuments.json";

@Injectable()
export class PoiService {

    getMonuments(){
        return JSON.stringify(monuments)
    }

}
