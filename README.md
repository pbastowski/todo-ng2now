# todo-ng2now

ToDo app coded using the [Angular2-now](https://github.com/pbastowski/angular2-now) library and with [angular-meteor](http://angular-meteor.com/).

Click here for the [demo](http://todo-ng2now.meteor.com/).

## Comparing angular2-now and Aurelia

After readin [Porting an Angular 2.0 App to Aurelia](http://blog.durandal.io/2015/05/20/porting-an-angular-2-0-app-to-aurelia/) I was inspired to do a side by side comparison of **angular2-now** and **Aurelia**. I wanted to see just how much more code, if any, I would be forced to write with AngularJS 1.3, angular2-now and angular-meteor. 

*Notice:* For comparison, I have copied the Aurelia code samples from the abovementioned blog. 

So, this is not an extensive review with commentary, etc. Just a side by side code and HTML.

## The App itself

Aurelia obviously wins here, with much shorter code.

#### app.js

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

## app.html

Angular2-now wins this round with shorter code.

#### Angular2-now
```html
<div>  
    <todo-list></todo-list>
    <new-item></new-item>
</div>
```

#### Aurelia
```html
<template>  
  <require from="./todo-list"></require>
  <require from="./new-item"></require>

  <todo-list></todo-list>
  <new-item></new-item>
</template>
```

## todo-list

Well, these are exactly the same length... Nice.

#### todo-list.js

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

## todo-list.html

Both are about the same length here.

#### Angular2-now

```html
<div style="margin-bottom:10px">
  <h1>To Do</h1>
  <div style="padding:5px" ng-repeat="item in vm.items">
    <input type="checkbox" ng-model="item.completed"/> {{ item.text }}<a ng-click="vm.removeItem(item)" class="glyphicon glyphicon-remove"></a>
  </div>
  <button ng-if="vm.items.length > 1" ng-click="vm.completeAll()" class="btn btn-xs btn-warning">Complete All</button>
</div>
```

### Aurelia
```html
<template style="margin-bottom:10px">  
  <h1>To Do</h1>
  <div style="padding:5px" repeat.for="item of items">  
      <input type="checkbox" checked.bind="item.completed" />
      ${item.text} <a class="glyphicon glyphicon-remove" click.trigger="$parent.removeItem(item)"></a>
  </div>
  <button if.bind="items.length" class="btn btn-xs btn-warning" click.trigger="completeAll()">Complete All</button>
</template>  
```

## New-Item

Angular2-now version is shorter here. I optimised the HTML for Angular 1.3, which makes two way binding a bit easier than the Angular 2 version.

#### new-item.js

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

## new-item.html

So, Angular2-now wins this one, again.

#### Angular2-now

```html
<form ng-submit="vm.addItem()" class="form-inline">
  <div class="form-group">
    <label for="description">New Item</label>
    <input id="description" type="text" ng-model="vm.input" class="form-control"/>
  </div>
  <button type="submit" class="btn btn-primary">Add Item</button>
</form>
```

#### Aurelia

```html
<template>  
  <div class="form-inline">
    <div class="form-group">
      <label for="description">New Item</label>
      <input id="description" class="form-control" value.bind="value" keyup.trigger="keyPressed($event)">
    </div>
    <button class="btn btn-primary" type="button" click.trigger="addItem()">Add Item</button>
  </div>
</template> 
```

## Summary

From the above short examples, it would appear that you can write nice, short code if you use the [Angular2-now](https://github.com/pbastowski/angular2-now) library with your [angular-meteor](http://angular-meteor.com/) projects.

