@Component({ selector: 'new-item' })
@View({ templateUrl: 'client/components/new-item.html' })
@Inject(['todoItems'])

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