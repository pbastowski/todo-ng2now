# todo-ng2now
ToDo app coded using the angular2-now library and AngularJS 1.3

Click here for the [demo](http://todo-ng2now.meteor.com/).

## Comparing angular2-now and Aurelia

Having read [Porting an Angular 2.0 App to Aurelia](http://blog.durandal.io/2015/05/20/porting-an-angular-2-0-app-to-aurelia/) had inspired me to do a side by side comparison of **angular2-now** and **Aurelia**. I wanted to see just how much more code I would be forced to write with AngularJS 1.3 and angular2-now. 

Well, let's see..

### app.js

<table>
<thead>
  <tr>
    <th>
      angular2-now<br>
    </th>
    <th>
      Aurelia<br>
    </th>
  </tr>
</thead>
  <tr>
    <td>
<pre>
angular.extend(window, angular2now);
angular2now.options({ controllerAs: 'vm' })

angular.module('todo-app', ['angular-meteor']);

@Component({ selector: 'todo-app' })
@View({ templateUrl: 'client/components/app.html' })
class TodoApp { }

bootstrap(TodoApp);
</pre>
    </td>
    <td>
<pre>
export class TodoApp {}  
</pre>
    </td>
  </tr>
</table>

### todo-list.js

<table>
<thead>
  <tr>
    <th>
      angular2-now<br>
    </th>
    <th>
      Aurelia<br>
    </th>
  </tr>
</thead>
  <tr>
    <td>
<pre>
@Component({ selector: 'todo-list', injectables: ['todoItems'] })
@View({ templateUrl: 'client/components/todo-list.html' })

class TodoList {
    constructor(todoItems) {
        this.items = todoItems;
    }
    completeAll() {
        this.items.forEach( item => item.completed = true );
    }
    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }
}
</pre>
    </td>
    <td>
<pre>
import {TodoItems} from 'services/todo-items';

export class TodoList {  
  static inject = [TodoItems];
  constructor(todoitems) {
    this.items = todoitems.items;
  }
  completeAll() {
    this.items.forEach(item => item.completed = true);
  }
  removeItem(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
</pre>
    </td>
  </tr>
</table>

