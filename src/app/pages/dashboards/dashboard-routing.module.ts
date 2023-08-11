import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgrxDashboardComponent } from './ngrx-dashboard/ngrx-dashboard.component';
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'ngrxDashboard',
                component: NgrxDashboardComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
