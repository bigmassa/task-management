import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './components/client.component';
import { ClientDeleteComponent } from './components/client-delete.component';
import { ClientDetailFormComponent } from './components/client-detail-form.component';
import { ClientListComponent } from './components/client-list.component';
import { JobComponent } from './components/job.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found.component';
import { ReportListComponent } from './components/report-list.component';
import { TaskboardComponent } from './components/taskboard.component';
import { TimesheetComponent } from './components/time-sheet.component';

const routes: Routes = [
    { path: '', component: TaskboardComponent },
    { path: 'clients', component: ClientListComponent},
    { path: 'clients/new', component: ClientDetailFormComponent},
    { path: 'clients/:id', component: ClientComponent},
    { path: 'clients/:id/detail', component: ClientDetailFormComponent},
    { path: 'clients/:id/delete', component: ClientDeleteComponent},
    { path: 'clients/:client_id/jobs/:id', component: JobComponent},
    { path: 'reporting', component: ReportListComponent},
    { path: 'timesheet', component: TimesheetComponent},
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }