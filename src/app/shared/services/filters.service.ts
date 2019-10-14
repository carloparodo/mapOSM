import { Injectable } from '@angular/core';
import { Filter } from '../models/filter.model';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class FilterListService {
    filterList=[]

    getFilterObject(){
        return this.filterList
    }

    setFilterObjct(filter){
        this.filterList.push(filter)
    }

    removeListFilters(){
        this.filterList=[]
    }
}