import { Component, NgZone, OnInit } from '@angular/core';
const ManageIQ = (<any> window).ManageIQ;

@Component({
  selector: 'hello-angular',
  template: `<h1>Angular: Hello at {{name}}</h1>`
})
export class AppComponent implements OnInit {
  name = '(press the toolbar)';

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    const setName = () => this.name = (new Date()).toString();

    ManageIQ.angular.rxSubject.subscribe((event) => {
      var eventType = event.type;

      if (eventType === 'demo' && event.operation === 'angular') {
        this.zone.run(setName);
      }
    });
  }
}
