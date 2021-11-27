import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from 'src/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { StudentComponent } from './student/student.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';

@NgModule({
  declarations: [
    UserComponent, StudentComponent, EnrollmentComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
