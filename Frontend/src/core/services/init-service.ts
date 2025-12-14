import {inject, Injectable} from '@angular/core';
import {AccountService} from './account-service';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountService = inject(AccountService)

  init(){
    const userString = localStorage.getItem('user');
    if (!userString) return of(null)
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);

    return of(null) //属于异步代码，所以就可以在初始化逻辑中等待 初始化完成
  }
}
