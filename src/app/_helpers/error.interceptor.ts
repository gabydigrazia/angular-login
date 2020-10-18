import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../shared/alert/alert.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private dialog: MatDialog
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                const dialogRef = this.dialog.open(AlertComponent, {
                    width: '300px',
                    data: 'Unauthorized user',
                  });
                dialogRef.afterClosed().subscribe(result => {
                    location.reload();
                  });
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
