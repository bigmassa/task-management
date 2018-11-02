import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './components/client.component';
import { ClientListComponent } from './components/client-list.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found.component';
import { ReportListComponent } from './components/report-list.component';
import { TaskboardComponent } from './components/task-board.component';
import { TimesheetComponent } from './components/time-sheet.component';

const routes: Routes = [
    { path: '', component: TaskboardComponent },
    { path: 'clients', component: ClientListComponent},
    { path: 'clients/:id', component: ClientComponent},
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