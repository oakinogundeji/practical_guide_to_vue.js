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
      this.todos = [];
      var completedTodos = this.todosList.filter(function (todo) {
        return todo.completed == true;
      }.bind(this));
      console.log('Completed todos', completedTodos);
      this.todos = completedTodos;
      if(this.todos.length < 1) {
        console.log('no completed todos to display');
        this.noTodos = true;
      }
      else {
        this.noTodos = false;
      }
      return true;
    }
  },
  compiled: function () {
    console.log('todos list length', this.todosList.length);
    var completedTodos = this.todosList.filter(function (todo) {
      return todo.completed == true;
    }.bind(this));
    if(completedTodos.length < 1) {
      this.noTodos = true;
    }
    else {
      this.noTodos = false;
      this.$emit('updatetodos');
    }
  }
};
