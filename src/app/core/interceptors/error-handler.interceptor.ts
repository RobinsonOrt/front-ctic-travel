import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe((catchError((error: HttpErrorResponse) => {
    let errorMessage = '';
    if (error.status === 403) {
      alert('No tienes permisos para acceder a este recurso, por favor inicia sesión con un usuario con permisos suficientes.');
      localStorage.clear();
      window.location.href = '/';
      errorMessage = `No tienes permisos para acceder a este recurso.`;
    } else if (error.status === 404) {
      errorMessage = `No se ha encontrado el recurso solicitado.`;
    } else if (error.status === 401) {
      errorMessage = `Email o contraseña incorrectos`;
    } else if (error.error.error == "Bad Request"){
      errorMessage = 'Los datos ingresados no son válidos. Por favor, revisalos y vuelve a intentar.';
    } else if (error.error.error){
      errorMessage = error.error.response;
    } else {
      errorMessage = `Ha ocurrido un error en el servidor, por favor intente más tarde.`;
    }
    return throwError(() => errorMessage);
  })))
};
