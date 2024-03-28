import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';

const sharedComponents = [SpinnerComponent, PageComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  exports: [...sharedComponents],
})
export class SharedModule {}
