// AngularJS imports
import { module } from 'angular';

import { ApiService } from './services';
import {
    appComponent,
    headerComponent,
    tasksContainerComponent,
    taskComponent,
    sidebarComponent,
    previewComponent,
    formComponent
} from './components';

// AngularJS module
module ('todoApp', [])
    .component('sswApp', appComponent)
    .component('sswHeader', headerComponent)
    .component('sswTasksContainer', tasksContainerComponent)
    .component('sswTask', taskComponent)
    .component('sswSidebar', sidebarComponent)
    .component('sswPreview', previewComponent)
    .component('sswForm', formComponent)
    .service('ApiService', ApiService)
    .name;

// Angular imports
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';


// Angular module
@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    declarations: [

    ],
    entryComponents: [

    ]
})
export class AppModule {
    ngDoBootstrap() {}
}
