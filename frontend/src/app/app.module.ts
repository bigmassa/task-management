import * as actions from './state/actions';

import { AppState, reducers } from './state/state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AutoResizeDirective } from './directives/auto-resize.directive';
import { AvatarComponent } from './components/avatar.component';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent } from './components/calendar.component';
import { ClientComponent } from './components/client.component';
import { ClientListComponent } from './components/client-list.component';
import { ClientSearchPipe } from './pipes/client-search.pipe';
import { ClosedJobsPipe } from './pipes/closed-jobs.pipe';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { EffectsModule } from '@ngrx/effects';
import { GetPipe } from './pipes/get.pipe';
import { JobComponent } from './components/job.component';
import { JobSearchPipe } from './pipes/job-search.pipe';
import { NgModule } from '@angular/core';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NotFoundComponent } from './components/not-found.component';
import { OpenJobsPipe } from './pipes/open-jobs.pipe';
import { ReportListComponent } from './components/report-list.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search.component';
import { TagComponent } from './components/tag.component';
import { TaskCardComponent } from './components/task-card.component';
import { TaskCreateFormComponent } from './components/task-create-form.component';
import { TaskFormComponent } from './components/task-form.component';
import { TaskboardComponent } from './components/taskboard.component';
import { TasksByStatusPipe } from './pipes/tasks-by-status.pipe';
import { TimeEntryFormComponent } from './components/time-entry-form.component';
import { TimesheetComponent } from './components/time-sheet.component';
import { TimesheetSignoffComponent } from './components/time-sheet-signoff.component';
import { effects } from './state/effects';

@NgModule({
    declarations: [
        AppComponent,
        AutoResizeDirective,
        AvatarComponent,
        CalendarComponent,
        ClosedJobsPipe,
        ClientComponent,
        ClientListComponent,
        ClientSearchPipe,
        GetPipe,
        JobComponent,
        JobSearchPipe,
        NotFoundComponent,
        OpenJobsPipe,
        ReportListComponent,
        SearchComponent,
        TagComponent,
        TaskboardComponent,
        TaskCardComponent,
        TaskCreateFormComponent,
        TaskFormComponent,
        TasksByStatusPipe,
        TimeEntryFormComponent,
        TimesheetComponent,
        TimesheetSignoffComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        EffectsModule.forRoot(effects),
        DropzoneModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'csrftoken',
            headerName: 'X-CSRFTOKEN'
        }),
        NgxDnDModule,
        ReactiveFormsModule,
        RouterModule,
        StoreModule.forRoot(reducers)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(public store: Store<AppState>) {
        store.dispatch({ type: actions.DataActions.LOAD_DATA });
    }
    
}
