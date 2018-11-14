import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[formError]'
})
export class FormErrorDirective implements OnDestroy {

    private control: FormControl;
    private subscription: Subscription;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
    }

    @Input() set formError(control: FormControl) {
        this.control = control;
        this.subscription = this.control.statusChanges.subscribe(() => this.check())
    }

    private check() {
        this.viewContainer.clear();
        if (this.control.invalid && (this.control.dirty || this.control.touched)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
