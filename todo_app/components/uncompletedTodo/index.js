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
  methods: {
    markComplete: function (todo) {
      console.log('mark this todo as complete');
      return this.$dispatch('completedtodo', todo);
    },
    deleteTodo: function (todo) {
      console.log('delete this todo');
      return this.$dispatch('deletetodo', todo);
    },
    editTodo: function (todo) {
      console.log('edit this todo');
      return this.$dispatch('edittodo', todo);
    }
  },
  events: {
    'getnewtodo': function (todo) {
      if(!todo.completed) {
        console.log('just received new todo from base VM');
        this.noTodos = false;
        return this.todos.unshift(todo);
      }
      return null;
    },
    'updatetodos': function () {
      this.todos = [];
      var uncompletedTodos = this.todosList.filter(function (todo) {
        return todo.completed == false;
      }.bind(this));
      console.log('uncompleted todos', uncompletedTodos);
      this.todos = uncompletedTodos;
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
