;(function() {

var StatusBar = tyler.createElement({
    initialize() {
        this.node.querySelector('.remove-completed')
            .addEventListener('click', this.fires('remove completed todo items'));
    },
    render(data) {
        if (!data) return;

        var uncompleted = {
            count: data.uncompleted || 'No',
            items: data.uncompleted === 1 ? 'item' : 'items'
        };

        this.node.querySelector('.status')
            .textContent = `${uncompleted.count} uncompleted ${uncompleted.items}`;

        var completed = {
            count: data.completed,
            items: data.completed === 1 ? 'item' : 'items'
        };

        this.node.querySelector('.remove-completed')
            .textContent = `Remove ${completed.count} completed ${completed.items}`;
        
        Object.keys(data).forEach(key => this.node.setAttribute('data-' + key, data[key]));
    },
    preprocess(data) {
        return {
            uncompleted: data.total - data.completed,
            completed: data.completed
        };
    }
})
.on('ready', function() {
    this.initialize();
})
.on('todo list notifies', function(event, options) {
    this.render(this.preprocess(options));
});

new StatusBar(document.querySelector('#todo-statusbar'));

})();