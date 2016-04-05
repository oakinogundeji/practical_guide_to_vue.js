module.exports = {
  template: require('./template.html'),
  data: function () {
    return {
      todo: ''
    };
  },
  methods: {
    addTodo: function () {
      if(this.todo.trim()) {
        var data = {
          todo: this.todo,
          completed: false
        };
        this.todo = '';
        return this.$dispatch('newtodo', data);
      }
      return null;
    },
    discardTodo: function () {
      return this.todo = '';
    }
  },
  events: {
    'changetodo': function (todo) {
      console.log('notified to edit this todo');
      return this.todo = todo.todo;
    }
  }
};
