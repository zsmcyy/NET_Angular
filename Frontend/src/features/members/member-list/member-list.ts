import {Component, inject} from '@angular/core';
import {MemberService} from '../../../core/services/member-service';
import {Member} from '../../../types/member';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MemberCard} from '../member-card/member-card';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard], // 异步管道
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  private memberService = inject(MemberService)
  // 用来存储成员的可观察对象(报错,因为这个请求时在服务内部完成的,所以必须在构造函数中对其进行初始化)
  protected members$: Observable<Member[]>

  constructor() {
    this.members$ = this.memberService.getMembers()
  }
}
