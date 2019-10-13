import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AvatarComponent } from './components/avatar.component';
import { CalendarComponent } from './components/calendar.component';
import { ClientContactFormComponent } from './components/client-contact-form.component';
import { ClientDeleteComponent } from './components/client-delete.component';
import { ClientDetailFormComponent } from './components/client-detail-form.component';
import { ClientListComponent } from './components/client-list.component';
import { ClientComponent } from './components/client.component';
import { DashboardPanelComponent } from './components/dashboard-panel.component';
import { DashboardStatisticComponent } from './components/dashboard-statistic.component';
import { JobBoardColumnComponent } from './components/job-board-column.component';
import { JobDeleteComponent } from './components/job-delete.component';
import { JobDetailFormComponent } from './components/job-detail-form.component';
import { JobRecurringCostFormComponent } from './components/job-recurring-cost-form.component';
import { JobRelationshipFormComponent } from './components/job-relationship-form.component';
import { JobComponent } from './components/job.component';
import { LoadingSplashComponent } from './components/loading-splash.component';
import { LogoComponent } from './components/logo';
import { NotFoundComponent } from './components/not-found.component';
import { SearchComponent } from './components/search.component';
import { TabsComponent } from './components/tabs.component';
import { TagComponent } from './components/tag.component';
import { TaskCardComponent } from './components/task-card.component';
import { TaskFormComponent } from './components/task-form.component';
import { TasksComponent } from './components/tasks.component';
import { TimeEntryFormComponent } from './components/time-entry-form.component';
import { TimesheetSignoffComponent } from './components/time-sheet-signoff.component';
import { TimesheetComponent } from './components/time-sheet.component';
import { UserContentComponent } from './components/user-content.component';
import { MarkdownField } from './components/markdown-field.component';
import { MomentUtcDateAdapter } from './dates';
import { AutofocusDirective } from './directives/auto-focus.directive';
import { AutoResizeDirective } from './directives/auto-resize.directive';
import { AutoScrollDirective } from './directives/auto-scroll.directive';
import { FormErrorDirective } from './directives/formerror.directive';
import { ClientSearchPipe } from './pipes/client-search.pipe';
import { ClosedJobsPipe } from './pipes/closed-jobs.pipe';
import { GetPipe } from './pipes/get.pipe';
import { JobSearchPipe } from './pipes/job-search.pipe';
import { OpenJobsPipe } from './pipes/open-jobs.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ShowStatusOnDashboardPipe } from './pipes/show-status-on-dashboard.pipe';
import { TaskHasStatusPipe } from './pipes/task-has-status.pipe';
import { TaskIsOverduePipe } from './pipes/task-is-overdue.pipe';
import { TaskSearchPipe } from './pipes/task-search.pipe';
import { TasksByStatusPipe } from './pipes/tasks-by-status.pipe';
import { TasksFilterStatusPipe } from './pipes/tasks-filter-status.pipe';
import { LoadingInterceptor } from './services/interceptors';
import { effects } from './state/effects';
import { reducers } from './state/state';

export function markedOptions(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.blockquote = (text: string) => {
        return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
    };

    return {
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
    };
}

@NgModule({
    declarations: [
        AppComponent,
        AutofocusDirective,
        AutoResizeDirective,
        AutoScrollDirective,
        AvatarComponent,
        CalendarComponent,
        ClosedJobsPipe,
        ClientComponent,
        ClientContactFormComponent,
        ClientDeleteComponent,
        ClientDetailFormComponent,
        ClientListComponent,
        ClientSearchPipe,
        DashboardPanelComponent,
        DashboardStatisticComponent,
        FormErrorDirective,
        GetPipe,
        JobBoardColumnComponent,
        JobComponent,
        JobDeleteComponent,
        JobDetailFormComponent,
        JobRecurringCostFormComponent,
        JobRelationshipFormComponent,
        JobSearchPipe,
        LoadingSplashComponent,
        LogoComponent,
        MarkdownField,
        NotFoundComponent,
        OpenJobsPipe,
        OrderByPipe,
        SearchComponent,
        TabsComponent,
        TagComponent,
        TasksComponent,
        TaskCardComponent,
        TaskFormComponent,
        TasksByStatusPipe,
        TaskSearchPipe,
        TasksFilterStatusPipe,
        TaskHasStatusPipe,
        TaskIsOverduePipe,
        ShowStatusOnDashboardPipe,
        TimeEntryFormComponent,
        TimesheetComponent,
        TimesheetSignoffComponent,
        UserContentComponent,
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
        MarkdownModule.forRoot({

            markedOptions: {
                provide: MarkedOptions,
                useFactory: markedOptions,
            },
        }),
        ReactiveFormsModule,
        RouterModule,
        StoreModule.forRoot(reducers)
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
