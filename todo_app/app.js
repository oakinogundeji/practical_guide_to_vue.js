/**
*Module dependencies
*/
//-----------------------------------------------------------------------------
var Vue = require('vue');
//=============================================================================
/**
*Define the base VM, pass in the 'el', 'data', 'methods', 'components' and
'events' properties of the Vue constructor options object
*/
//-----------------------------------------------------------------------------
var baseVM = new Vue({
  el: '#app',
  data: {
    todos: [],
    activeComponent: 'app-uncompleted-todo'
  },
  methods: {
    viewAllTodos: function () {
      console.log('view all todos btn clicked');
      return this.activeComponent = 'app-all-todos';
    },
    viewCompletedTodos: function () {
      console.log('view completed todos btn clicked');
      return this.activeComponent = 'app-completed-todo';
    },
    viewUncompletedTodos: function () {
      console.log('view uncompleted todos btn clicked');
      return this.activeComponent = 'app-uncompleted-todo';
    },
    extractTodo: function (todo) {
      var idx;
      this.todos.filter(function (item, indx) {
        if(item.todo == todo.todo) {
          return idx = indx;
        }
        return null;
      });
      return idx;
    }
  },
  components: {
    'app-new-todo': require('./components/newTodo'),
    'app-uncompleted-todo': require('./components/uncompletedTodo'),
    'app-completed-todo': require('./components/completedTodo'),
    'app-all-todos': require('./components/allTodos')
  },
  events: {
    'newtodo': function (todo) {
      console.log('received new todo', todo);
      this.todos.unshift(todo);
      this.$broadcast('getnewtodo', todo);
      return this.$broadcast('updatetodos');
    },
    'completedtodo': function (todo) {
      console.log('notified that this todo is complete');
      var idx = this.extractTodo(todo);
      this.todos[idx].completed = true;
      return this.$broadcast('updatetodos');
    },
    'deletetodo': function (todo) {
      console.log('notified that this todo is to be deleted');
      var idx = this.extractTodo(todo);
      this.todos.splice(idx, 1);
      return this.$broadcast('updatetodos');
    },
    'edittodo': function (todo) {
      console.log('notified that this todo is to be edited', todo);
      var idx = this.extractTodo(todo);
      this.todos.splice(idx, 1);
      this.$broadcast('updatetodos');
      return this.$broadcast('changetodo', todo);
    }
  }
});
//=============================================================================
