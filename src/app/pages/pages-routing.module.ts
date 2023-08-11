import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'dashboards',
            loadChildren: () => import('./dashboards/dashboard.module')
                .then(m => m.DashboardModule),
        },

    ],
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
