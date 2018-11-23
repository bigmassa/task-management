import * as actions from './state/actions';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppState, reducers } from './state/state';
import { AutoResizeDirective } from './directives/auto-resize.directive';
import { AvatarComponent } from './components/avatar.component';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent } from './components/calendar.component';
import { ClientComponent } from './components/client.component';
import { ClientContactFormComponent } from './components/client-contact-form.component';
import { ClientDeleteComponent } from './components/client-delete.component';
import { ClientDetailFormComponent } from './components/client-detail-form.component';
import { ClientListComponent } from './components/client-list.component';
import { ClientSearchPipe } from './pipes/client-search.pipe';
import { ClosedJobsPipe } from './pipes/closed-jobs.pipe';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { effects } from './state/effects';
import { EffectsModule } from '@ngrx/effects';
import { FormErrorDirective } from './directives/formerror.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetPipe } from './pipes/get.pipe';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { JobComponent } from './components/job.component';
import { JobDetailFormComponent } from './components/job-detail-form.component';
import { JobRecurringCostFormComponent } from './components/job-recurring-cost-form.component';
import { JobRelationshipFormComponent } from './components/job-relationship-form.component';
import { JobSearchPipe } from './pipes/job-search.pipe';
import { NgModule } from '@angular/core';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NotFoundComponent } from './components/not-found.component';
import { OpenJobsPipe } from './pipes/open-jobs.pipe';
import { ReportListComponent } from './components/report-list.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search.component';
import { Store, StoreModule } from '@ngrx/store';
import { TabsComponent } from './components/tabs.component';
import { TagComponent } from './components/tag.component';
import { TaskboardComponent } from './components/taskboard.component';
import { TaskCardComponent } from './components/task-card.component';
import { TaskCreateFormComponent } from './components/task-create-form.component';
import { TaskFormComponent } from './components/task-form.component';
import { TasksByStatusPipe } from './pipes/tasks-by-status.pipe';
import { TimeEntryFormComponent } from './components/time-entry-form.component';
import { TimesheetComponent } from './components/time-sheet.component';
import { TimesheetSignoffComponent } from './components/time-sheet-signoff.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { TaskSearchPipe } from './pipes/task-search.pipe';

@NgModule({
    declarations: [
        AppComponent,
        AutoResizeDirective,
        AvatarComponent,
        CalendarComponent,
        ClosedJobsPipe,
        ClientComponent,
        ClientContactFormComponent,
        ClientDeleteComponent,
        ClientDetailFormComponent,
        ClientListComponent,
        ClientSearchPipe,
        FormErrorDirective,
        GetPipe,
        JobComponent,
        JobDetailFormComponent,
        JobRecurringCostFormComponent,
        JobRelationshipFormComponent,
        JobSearchPipe,
        NotFoundComponent,
        OpenJobsPipe,
        ReportListComponent,
        SearchComponent,
        TabsComponent,
        TagComponent,
        TaskboardComponent,
        TaskCardComponent,
        TaskCreateFormComponent,
        TaskFormComponent,
        TasksByStatusPipe,
        TaskSearchPipe,
        TimeEntryFormComponent,
        TimesheetComponent,
        TimesheetSignoffComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        EffectsModule.forRoot(effects),
        DropzoneModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'csrftoken',
            headerName: 'X-CSRFTOKEN'
        }),
        MatDatepickerModule,
        MatNativeDateModule,
        NgxDnDModule,
        ReactiveFormsModule,
        RouterModule,
        StoreModule.forRoot(reducers)
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(public store: Store<AppState>) {
        store.dispatch({ type: actions.DataActions.LOAD_DATA });
        store.dispatch({ type: actions.SocketActions.START });
    }
    
}
