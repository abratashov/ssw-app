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

export default module ('todoApp', [])
    .component('sswApp', appComponent)
    .component('sswHeader', headerComponent)
    .component('sswTasksContainer', tasksContainerComponent)
    .component('sswTask', taskComponent)
    .component('sswSidebar', sidebarComponent)
    .component('sswPreview', previewComponent)
    .component('sswForm', formComponent)
    .service('ApiService', ApiService)
    .name;
