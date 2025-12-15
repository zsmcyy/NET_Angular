import {Component, inject} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  // Location 包含 go back 方法
  private location = inject(Location)

  goBack(){
    this.location.back()
  }
}
