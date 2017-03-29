import { Injectable } from '@angular/core';

import { DialogAlert } from './dialog';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class DialogService extends BaseService {

    getData(content: string,title:string) {
        DialogAlert.content = content;
        DialogAlert.title = title;
    }

    updateData() {        
        return Promise.resolve(DialogAlert);
    }

}