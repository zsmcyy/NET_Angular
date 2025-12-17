import { HttpInterceptorFn } from '@angular/common/http';
import {AccountService} from '../services/account-service';
import {inject} from '@angular/core';

// 修改请求,修改完成后请求会继续传递给下一个处理环节,
// 也就是这个拦截器之后的下一个处理器
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const user = accountService.currentUser();

  if (user) {
    req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${user.token}`
      }
    })
  }

  return next(req);
};
