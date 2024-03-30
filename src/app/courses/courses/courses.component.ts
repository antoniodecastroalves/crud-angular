import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
    ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        console.log(error);
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  ngOnInit(): void {
  }

}
