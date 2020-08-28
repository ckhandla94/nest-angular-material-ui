import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Components } from './components';
import { Pipes } from './pipes';
import { RouterModule } from '@angular/router';
import { StrToDatePipe } from './pipes/str-to-date.pipe';
import { Directives } from './diractive';
import { TranslateModule } from '@ngx-translate/core';
import { Services } from './services';
import { ToastyModule } from 'ngx-toasty';

const Modules = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  ToastyModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...Modules
  ],
  declarations: [
    ...Components,
    ...Pipes,
    ...Directives,
    StrToDatePipe,
  ],
  exports: [
    ...Modules,
    ...Pipes,
    ...Components,
    ...Directives,
  ],
  entryComponents: [
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...Services
      ]
    };
  }
}
