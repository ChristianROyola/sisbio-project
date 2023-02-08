import { Component } from '@angular/core';
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { mergeMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sisbio-project';

  constructor(private ofMessagin: AngularFireMessaging) {
    this.getToken()
  }

  requestPermision(){
    this.ofMessagin.requestPermission
      .pipe(mergeMapTo(this.ofMessagin.tokenChanges))
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },
      );
  }

  getToken(){
    this.ofMessagin.getToken.subscribe((res) => console.log("Token", res))
  }

}
