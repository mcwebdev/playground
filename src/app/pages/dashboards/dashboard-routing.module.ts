import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgrxDashboardComponent } from './ngrx-dashboard/ngrx-dashboard.component';
import { ChangeDetectionDashboardComponent } from './change-detection-dashboard/change-detection-dashboard.component';
import { RxjsDashboardComponent } from './rxjs-dashboard/rxjs-dashboard.component';
import { SignalsDashboardComponent } from './signals-dashboard/signals-dashboard.component';
import { PlaygroundComponent } from './playground/playground.component';
import { KeywordsComponent } from './keywords/keywords.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ComponentCommunicationComponent } from './component-communication/component-communication.component';
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'ngrxDashboard',
                component: NgrxDashboardComponent,
            },
            {
                path: 'changeDetectionDashboard',
                component: ChangeDetectionDashboardComponent,
            },
            {
                path: 'rxjsDashboard',
                component: RxjsDashboardComponent,
            },
            {
                path: 'signalsDashboard',
                component: SignalsDashboardComponent,
            },
            {
                path: 'playground',
                component: PlaygroundComponent,
            },
            {
                path: 'keywords',
                component: KeywordsComponent,
            },
            {
                path: 'subscribe',
                component: SubscribeComponent,
            },
            {
                path: 'subjects',
                component: SubjectsComponent,
            },
            {
                path: 'componentCommunication',
                component: ComponentCommunicationComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
