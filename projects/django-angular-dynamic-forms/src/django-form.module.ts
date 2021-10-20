import {NgModule} from '@angular/core';
import {DynamicFormsCoreModule} from '@ng-dynamic-forms/core';
import {DynamicFormsMaterialUIModule} from '@ng-dynamic-forms/ui-material';
import {NG_VALIDATORS, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InPageDjangoFormComponent} from './impl/inpage-django-form.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {DjangoFormContentComponent, externalValidator} from './impl/django-form-content.component';
import {DialogDjangoFormComponent} from './impl/dialog-django-form.component';
import {DjangoFormBaseComponent} from './impl/django-form-base.component';
import {DjangoFormDialogService} from './django-form-dialog.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [InPageDjangoFormComponent, DjangoFormContentComponent,
        DialogDjangoFormComponent, DjangoFormBaseComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule,
        DynamicFormsMaterialUIModule,
        MatProgressBarModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
    ],
    providers: [
        {provide: NG_VALIDATORS, useValue: externalValidator, multi: true},
        DjangoFormDialogService
    ],
    exports: [InPageDjangoFormComponent, DialogDjangoFormComponent, DjangoFormBaseComponent],
    entryComponents: [InPageDjangoFormComponent, DialogDjangoFormComponent, DjangoFormBaseComponent]
})
export class DjangoFormModule {
}
