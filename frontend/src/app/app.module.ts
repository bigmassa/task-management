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
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NotFoundComponent } from './components/not-found.component';
import { ReportListComponent } from './components/report-list.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search.component';
import { TaskCardComponent } from './components/task-card.component';
import { TaskCreateFormComponent } from './components/task-create-form.component';
import { TaskFormComponent } from './components/task-form.component';
import { TaskboardComponent } from './components/task-board.component';
import { TaskboardFilterComponent } from './components/task-board-filter.component';
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
        ClientComponent,
        ClientListComponent,
        ClientSearchPipe,
        NotFoundComponent,
        ReportListComponent,
        SearchComponent,
        TaskboardComponent,
        TaskboardFilterComponent,
        TaskCardComponent,
        TaskCreateFormComponent,
        TaskFormComponent,
        TimeEntryFormComponent,
        TimesheetComponent,
        TimesheetSignoffComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        EffectsModule.forRoot(effects),
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
