import {Component, AfterContentChecked} from '@angular/core';

import {DataStorageService} from '../../shared/data-storage.service';
import {HttpEvent} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';

@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterContentChecked {
    login;

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService) {}

    ngAfterContentChecked() {
        this.login = this.authService.onLogin();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe(
            (response: HttpEvent<Object>) => {
                console.log(response);
            }
            );
    }

    onFetchData() {
        this.dataStorageService.getRecipe();
    }
}