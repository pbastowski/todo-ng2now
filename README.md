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

### todo-list.html

```html
<div style="margin-bottom:10px">
  <h1>To Do</h1>
  <div style="padding:5px" ng-repeat="item in vm.items">
    <input type="checkbox" ng-model="item.completed"/> {{ item.text }}<a ng-click="vm.removeItem(item)" class="glyphicon glyphicon-remove"></a>
  </div>
  <button ng-if="vm.items.length > 1" ng-click="vm.completeAll()" class="btn btn-xs btn-warning">Complete All</button>
</div>
```

### new-item.js

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
@Component({ selector: 'new-item', injectables: ['todoItems'] })
@View({ templateUrl: 'client/components/new-item.html' })

class NewItem {
	constructor(todoItemList) {
        this.items = todoItemList
	}
	addItem() {
		this.items.push({
			text: this.input,
			completed: false
		})
		this.input = '';
	}
}
</pre>
    </td>
    <td>
<pre>
import {TodoItems} from 'services/todo-items';

export class NewItem {  
  static inject = [TodoItems];
  constructor(todoitems) {
    this.items = todoitems.items;
  }
  keyPressed($event) {
    if($event.which === 13) {
      this.addItem(this.value);
    }
  }
  addItem(input) {
    this.items.push({
      text: this.value,
      completed: false
    })
    this.value = '';
  }
}
</pre>
    </td>
  </tr>
</table>

### new-item.html

```html
<form ng-submit="vm.addItem()" class="form-inline">
  <div class="form-group">
    <label for="description">New Item</label>
    <input id="description" type="text" ng-model="vm.input" class="form-control"/>
  </div>
  <button type="submit" class="btn btn-primary">Add Item</button>
</form>
```
