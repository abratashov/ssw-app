import { module } from 'angular';

import { ApiService } from './services';
import { todoFormDirective } from './directives';
import { TodoAppController } from './controllers';

export default module ('todoApp', [])
    .directive('todoForm', <any>todoFormDirective)
    .service('ApiService', ApiService)
    .controller('todoAppController', TodoAppController)
    .name;
