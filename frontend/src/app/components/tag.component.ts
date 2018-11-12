import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../state/state';
import { ITag } from '../state/reducers/tag';
import { Observable } from 'rxjs';
import { getTagById } from '../state/selectors/tag';

@Component({
    selector: 'tag, [tag]',
    templateUrl: './tag.component.html'
})
export class TagComponent implements OnChanges {

    @Input() id: number;
    
    tag$: Observable<ITag>;
    
    constructor(private store: Store<AppState>) { }

    ngOnChanges(changes: SimpleChanges) {
        this.tag$ = this.store.pipe(select(getTagById(this.id)))
    }
}
