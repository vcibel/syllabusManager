import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Universidad Rafael Urdaneta';

  getUrl(){
    return "url('/src/assets/imgs/aulamagna.jpg')"
  }
}
