import { downgradeComponent } from '@angular/upgrade/static';
import { HeaderComponent } from './header.component';

export const headerComponentDowngraded = downgradeComponent({
    component: HeaderComponent,
    outputs: ['add']
});