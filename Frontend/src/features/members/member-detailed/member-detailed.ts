import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Member} from '../../../types/member';
import {filter} from 'rxjs';
import {AgePipe} from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router) //子组件需要在路由中提取 title
  protected member = signal<Member | undefined>(undefined)
  protected title = signal<string | undefined>('Profile') // 子组件中使用的 title

  ngOnInit(): void {
    // 访问成员对象
    this.route.data.subscribe({
      next: (data) => this.member.set(data['member'])
    })
    // 将路由中的 title 提取出来给 title 信号
    this.title.set(this.route.firstChild?.snapshot?.title)

    // 通过路由的事件管道监听路由的变化
    this.router.events.pipe(
      filter(event=>event instanceof NavigationEnd)
    ).subscribe({
      next: ()=>{
        this.title.set(this.route.firstChild?.snapshot?.title)
      }
    })
  }
}
