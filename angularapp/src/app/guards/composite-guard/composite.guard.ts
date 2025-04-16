import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompositeGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const userRole = this.authService.getUserRole();

    if (token && userRole === route.data['role']) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
