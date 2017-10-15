;(function() {

var Form = tyler.createElement({
    initialize() {
        var self = this;
        var form = this.node.querySelector('form');
        var input = this.node.querySelector('input');

        form.addEventListener('submit', event => {
            event.preventDefault();
            if (input.value) {
                self.fire('new todo item submitted', { value: input.value });
                input.value = '';
            }
        });

        input.value = '';
    }
})
.on('ready', function() {
    this.initialize();
});

new Form(document.querySelector('#todo-input-form'));

})();