import { Injectable } from '@angular/core';
import { Filter } from '../models/filter.model';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class FilterListService {
    filterList: Array<Filter>

    sqlite: SQLite
    database:SQLiteObject

    seedDatabase(){
        this.sqlite.create({
            name: 'filters.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {this.database=db})
            .catch(e =>{});
              
    }

    getFilterList(){
        return this.filterList
    }
}