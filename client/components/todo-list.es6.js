@Component({ selector: 'todo-list' })
@View({ templateUrl: 'client/components/todo-list.html' })
@Inject(['todoItems'])

class TodoList {
    constructor(todoItems) {
        this.items = todoItems;
    }

    setCompleted(item, checked) {
        item.completed = checked;
    }

    completeAll() {
        var that = this;
        this.items.forEach(function (item) {
            that.setCompleted(item, true);
        });
    }

    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }
}