import { APIService } from './api';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DeletableService {

    public static CLIENT = { app_label: 'wip', model_name: 'client' };

    private baseUrl: string = '/api/protected/';

    constructor(
        public api: APIService
    ) { }

    public check(type: any, pk: number): Promise<boolean> {
        return this.getProtected(type, pk).toPromise().then(
            (data) => {
                if (data.length == 0) {
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
            },
            (err) => {
                return Promise.resolve(false);
            }
        );
    }

    public getProtected(type: any, pk: number) {
        const queryParams = `?app_label=${type.app_label}&model_name=${type.model_name}&pk=${pk}`;
        return this.api.all(`${this.baseUrl}${queryParams}`);
    }
}
