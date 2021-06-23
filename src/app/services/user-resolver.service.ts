import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user-model';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {

  constructor(private userService: UserService, private router: Router) { }

  resolve() {
    const user = this.userService.query()
    if (user) {
      return user;
    } else {
      this.router.navigateByUrl('login')
      return null;
    }
  }
}
