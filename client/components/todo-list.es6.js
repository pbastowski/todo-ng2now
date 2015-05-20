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