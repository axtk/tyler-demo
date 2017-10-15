;(function() {

// this component class defines three custom methods and subscribes to a number of events

var List = tyler.createElement({
    initialize() {
        var self = this, list = this.node.querySelector('ul');
        this.itemTemplate = list.innerHTML.trim();

        this.node.addEventListener('click', event => {
            var item = event.target.closest('li');

            if (event.target.matches('input[type="checkbox"]')) {
                item.classList.toggle('completed', event.target.checked);
                self.fire('todo list updated');
            }

            if (event.target.matches('.remove')) {
                item.remove();
                self.fire('todo list updated');
            }

            if (event.target.matches('.edit')) {
                if (item.classList.contains('editable'))
                    self.fire('todo list item updated', { item });
                item.classList.toggle('editable');
            }
        });

        this.node.addEventListener('submit', event => {
            event.preventDefault();
            var item = event.target.closest('li');
            self.fire('todo list item updated', { item });
            item.classList.remove('editable');
        });
        
        list.innerHTML = '';
        this.fire('todo list initialized');
    },
    addItem(data) {
        var list = this.node.querySelector('ul');
        var item = tyler.toDOM(this.itemTemplate)[0];

        item.querySelector('.value').textContent = data.value;
        item.querySelector('.editing input').value = data.value;

        list.appendChild(item);
        this.fire('todo list updated');
    },
    removeCompleted() {
        Array.from(this.node.querySelectorAll('li.completed')).forEach(item => item.remove());
        this.fire('todo list updated');
    }
})
.on('ready', function() {
    this.initialize();
})
// here a single handler is assigned to multiple events
.on(['todo list initialized', 'todo list updated'], function() {
    var list = this.node.querySelector('ul');
    this.fire('todo list notifies', {
        completed: list.querySelectorAll('li.completed').length,
        total: list.querySelectorAll('li').length
    });
})
.on('todo list notifies', function(event, options) {
    this.node.classList.toggle('empty', options.total === 0);
})
.on('todo list item updated', function(event, options) {
    var item = options.item, input = item.querySelector('.editing input');
    item.querySelector('.value').textContent = input.value;
})
.on('new todo item submitted', function(event, options) {
    this.addItem(options);
})
.on('remove completed todo items', function() {
    this.removeCompleted();
});

new List(document.querySelector('#todo-list-container'));

})();