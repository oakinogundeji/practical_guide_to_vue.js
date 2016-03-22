/*Export the following object which provides the properties of the options object
passed to the constructor function of a Vue.js component*/
module.exports = {
  template: require('./template.html'),
  data: function () {
    return {
      todo: ''
    };
  },
  methods: {
    addTodo: function () {
      if(this.todo.trim()) {//confirm the value of the 'input' widget is not null
        var data = {//create a new 'todo' object
          todo: this.todo,
          completed: false
        };
        this.todo = '';//reset value of 'todo' data property
        return this.$dispatch('newtodo', data);//emit 'newtodo' custome event
      }
      return null;//if value of the 'input' widget is null, do nothing
    },
    discardTodo: function () {
      return this.todo = '';//reset value of 'todo' data property
    }
  },
  events: {
    'changetodo': function (todo) {
      console.log('notified to edit this todo');
      return this.todo = todo.todo;//set value of 'todo' property,
      //to value of 'todo.todo'
    }
  }
};
