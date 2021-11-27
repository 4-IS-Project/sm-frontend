import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { StudentComponent } from './student/student.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
        {
          path: 'students',
          component: StudentComponent,
        },
        {
          path: 'enrollment',
          component: EnrollmentComponent
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
