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
  props: ['todosList'],//declare the 'todosList' prop which is bound to the value
  //of the :todos-list attribute on the parent V i.e. as defined by index.html
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
      if(!todo.completed) {//when this custom event is emitted, ensure that the
        //accompanying 'todo' object is in an uncompleted state
        console.log('just received new todo from base VM');
        this.noTodos = false;
        return this.todos.unshift(todo);
      }
      return null;//if the 'todo' is completed, do nothing
    },
    'updatetodos': function () {
      this.todos = [];//reset the 'todos' array
      var uncompletedTodos = this.todosList.filter(function (todo) {
        return todo.completed == false;
      }.bind(this));//extract only 'uncompleted' todos from the 'todosList' prop
      console.log('uncompleted todos', uncompletedTodos);
      this.todos = uncompletedTodos;//set the 'todos' array to the value of the
      //filtered todos array
      return true;//returning true ensure that this event continues to be propagated
      //to other child components
    }
  },
  compiled: function () {//register a handler which listens for the 'compiled'
  //lifecycle event to be emitted when this component is created
    console.log('todos list length', this.todosList.length);
    if(this.todosList.length < 1) {//check if any todo exists in the 'todosList' prop
      this.noTodos = true;
    }
    else {
      this.noTodos = false;
      this.$emit('updatetodos');//if todos exist, emit the 'updatetodos' custom
      //property on this component
    }
  }
};
