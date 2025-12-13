import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginCreds, RegisterCreds, User} from '../../types/user';
import {tap} from 'rxjs';

// 装饰器，表示这个类可以使用 Angular 的依赖注入
// 也可以被注入到项目中的其他组件、服务、类 中。
@Injectable({
  providedIn: 'root',   //为整个应用提供，在整个应用运行期间持续存在
})
export class AccountService {
  private http = inject(HttpClient)
  // 定义一个当前用户的信号（可以是User类型 也可以是 null）的属性，初始值为 null
  currentUser = signal<User|null>(null)

  baseUrl = 'https://localhost:5001/api/'

  register(creds: RegisterCreds){
    return this.http.post<User>(this.baseUrl+'account/register', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  login(creds: LoginCreds){
    return this.http.post<User>(this.baseUrl+'account/login', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUser.set(user)
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null)
  }
}
