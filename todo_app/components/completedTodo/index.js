/*Export the following object which provides the properties of the options object
passed to the constructor function of a Vue.js component*/
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
      if(this.todos.length < 1) {//check if any completed 'todos' exist
        console.log('no completed todos to display');
        this.noTodos = true;//if none display 'no todos' message
      }
      else {
        this.noTodos = false;//else hide 'no todos' message
      }
      return true;
    }
  },
  compiled: function () {
    console.log('todos list length', this.todosList.length);
    var completedTodos = this.todosList.filter(function (todo) {
      return todo.completed == true;
    }.bind(this));
    if(completedTodos.length < 1) {//check if any completed todos exist
      this.noTodos = true;//if none display 'no todos' message
    }
    else {
      this.noTodos = false;//else hide 'no todos' message and
      this.$emit('updatetodos');//emit event
    }
  }
};
