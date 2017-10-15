// now that all required components are in place, the dispatcher fires the 'ready' event;
// all components that have subscribed to this event will be notified to invoke their handlers
tyler.dispatcher.fire('ready');