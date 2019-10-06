import { Injectable } from '@angular/core';
import { Filter } from '../models/filter.model';

@Injectable()
export class FilterListService {
    filterList: Array<Filter>

    getFilterList(){
        return this.filterList
    }
}