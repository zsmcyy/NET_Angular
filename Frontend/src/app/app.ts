import {HttpClient} from '@angular/common/http';
import {Component, inject, OnInit, signal} from '@angular/core';
import {lastValueFrom} from 'rxjs';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private http = inject(HttpClient);
  protected title = 'Dating App';
  // 使用 signal 方式：
  // 当这个信号值发生变化时，所有使用该信号的地方都会收到通知
  protected members=signal<any>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
