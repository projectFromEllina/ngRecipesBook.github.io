import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService ) {}

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.onLogin();
    }
}