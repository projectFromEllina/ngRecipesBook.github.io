import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from 'src/app/auth/user.model';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AuthService {
    usersChanged = new Subject<User[]>();
    login = false;
    created = false;

    private users: User[] = [
        new User (
            'admin@admin.ru',
            '11111111'
        )
    ];

    constructor ( private httpClient: HttpClient,
                  private router: Router,
                  private route: ActivatedRoute ) {}

    addUser(user: User) {
        this.users.push(user);
        this.usersChanged.next(this.users.slice());
    }

    setUser(users: User[]) {
        this.users = users;
        this.usersChanged.next(this.users.slice());
    }

    getUser() {
        this.httpClient.get<User[]>('https://recipe-book-a.firebaseio.com/users.json')
            .subscribe(
                (users) => {
                    this.setUser(users);
                }
            );
    }

    sendUsers() {
        return this.httpClient.put('https://recipe-book-a.firebaseio.com/users.json', this.users.slice())
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    }

    signupUser(newUser: User, email: string) {
        for (let user of this.users) {
            if (email === user['email']) {
                this.created = true;
            } else {
                this.created = false;
            }
        }
        if (!this.created) {
            this.addUser(newUser);
            this.sendUsers();
            this.login = true;
            this.goToMain();
        }
    }

    signin(email: string, pass: string) {
        for (let user of this.users) {
            if (email === user.email && pass === user.password) {
                this.login = true;
                this.goToMain();
                return ;
            }
        }
        this.login = false;
        return;
    }

    goToMain() {
        setTimeout(
            () => {
                this.router.navigate(['/'], {relativeTo: this.route});
            }, 2000);
    }

    onLogin() {
        return this.login;
    }

    onCreate() {
        return this.created;
    }
}