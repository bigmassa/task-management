import { Component, Input, forwardRef } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

const SEARCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchComponent),
  multi: true
};

@Component({
    selector: 'search, [search]',
    template: `
    <div class="icon-input mb-0">
        <input name="search" type="search" placeholder="Search" [(ngModel)]="searchVal" (ngModelChange)="searchChange($event)">
        <span class="icon-search"></span>
    </div>
    `,
    providers: [SEARCH_CONTROL_VALUE_ACCESSOR]
})
export class SearchComponent {

    searchVal: string = '';
    private _value: any = [];

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_:any) => void = noop;

    get value(): any {
        return this._value;
    };

    set value(value: any) {
        if (value !== this._value) {
            this._value = value;
            this._onChangeCallback(value);
        }
    }

    onTouched(){
        this._onTouchedCallback();
    }

    writeValue(value: any) {
        this._value = value;
        if (value) {
            this.searchVal = value.join(" ");
        }
    }

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    searchChange(value) {
        if (value) {
            this.value = value.split(" ");
        } else {
            this.value = [];
        }
    }
}
