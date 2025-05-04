import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {map, take} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

export const authGuard: CanActivateFn = (route, state) => {
  const  auth = inject(AngularFireAuth);
  const  router = inject(Router);

  return auth.authState.pipe(
    take(1),
    map(user => {
      if(user){
        return true;
      }
      else{
        return router.createUrlTree(['/login']);
      }
    })
  );
};
