angular.extend(window, angular2now);
angular2now.options({ controllerAs: 'vm' })

angular.module('todo-app', ['angular-meteor']);

@Component({ selector: 'todo-app' })
@View({ templateUrl: 'client/components/app.html' })
class TodoApp { }

bootstrap(TodoApp);