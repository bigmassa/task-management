import { Action } from '@ngrx/store';

export interface IActionWithPayload extends Action {
    payload?: any;
}

export interface IActionWithHTTPData {
    params?: any
}

export interface IMakeCall {
    telephone_number: string;
}
