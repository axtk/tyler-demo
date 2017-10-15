;(function() {

// this constructor defines a component with a single custom method, `initialize()`,
// and subscribes all its future instances to the 'ready' event

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

// this component is only initialized on the '#todo-input-form' DOM element
new Form(document.querySelector('#todo-input-form'));
// it has all the features defined in the class above:
// it has the `initialize()` method, which is called when a 'ready' event is fired

})();