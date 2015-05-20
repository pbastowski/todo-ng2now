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