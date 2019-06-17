ManageIQ.angular.app.component('hello', {
  controller: ['$timeout', function($timeout) {

    ManageIQ.angular.rxSubject.subscribe((event) => {

      var eventType = event.type;

      if (eventType === 'demo' && event.operation === 'angularjs') {
        $timeout(() => this.message = (new Date()).toString());
      }
    });
  }],
  template: `
    <h1>AngularJS: Hallo at {{$ctrl.message}}</h1>
  `
});
