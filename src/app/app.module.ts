// AngularJS imports
import { module } from 'angular';

import { ApiService } from './services';
import {
    appComponent,
    headerComponentDowngraded,
    tasksContainerComponent,
    taskComponent,
    sidebarComponent,
    previewComponent,
    formComponent
} from './components';

// AngularJS module
module ('todoApp', [])
    .component('sswApp', appComponent)
    .directive('sswHeader', headerComponentDowngraded)
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
import { HeaderComponent } from './components';


// Angular module
@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    declarations: [
        HeaderComponent
    ],
    entryComponents: [
        HeaderComponent
    ]
})
export class AppModule {
    ngDoBootstrap() {}
}
