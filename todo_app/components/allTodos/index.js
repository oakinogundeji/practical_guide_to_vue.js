module.exports = {
  template: require('./template.html'),
  data: function () {
    return {
      todos: [],
      noTodos: false
    };
  },
  props: ['todosList'],
  events: {
    'updatetodos': function () {
      this.noTodos = false;
      this.todos = [];
      this.todos = this.todosList;
      return true;
    }
  },
  compiled: function () {
    console.log('todos list length', this.todosList.length);
    if(this.todosList.length < 1) {
      this.noTodos = true;
    }
    else {
      this.noTodos = false;
      this.$emit('updatetodos');
    }
  }
};
