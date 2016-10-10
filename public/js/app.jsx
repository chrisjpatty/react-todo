var todoCounter = 0;

/**
 * All React components must start with a capital letter.
 * Communication between components is easiest in a parent-child relationship. Pay attention to how you nest your components.
 * To define a new React component, call the React.createClass() function. It takes functions as its arguments that define the component.
 * This function is currently attached to the window object for convenience. JSX files have their own scope, so this enables the render function in index.html to see this component. It's not necessary for production.
 */
window.App = React.createClass({
  /**
   * This function must return an object that holds its initial state. It only runs once, when the component is mounted.
   * This function is not required, but most of your components will need it.
   */
  getInitialState: function(){
    return{
      todos: []
    }
  },
  /**
   * You may define any custom function you want. For example, this function handles adding todos to the todo list.
   */
  addTodo: function(){
    //Uses jQuery to get the text value. There's multiple ways to do this.
    var name = $(".todo-input").val();
    //Increments the todo id.
    todoCounter++;
    //Creates a new object defining a todo.
    var todo = {
      name: name,
      id: todoCounter
    }
    //Checks that text has been entered.
    if(name != ""){
      //Stores the current array of todos in a variable.
      var todos = this.state.todos;
      //Add the new todo to the todo array.
      todos.push(todo);
      //This.setState() allows you to update the component's state.
      //In this case we're replacing the old todo array with our new one.
      //The magic of React is that this will automatically call the render function again and update the view with the new state.
      this.setState({
        todos: todos
      })
    }
  },
  deleteTodo: function(id){
    var todos = this.state.todos;
    //Filters through the array of todos to find the todo with the passed id.
    var todos = todos.filter(function(todo){
      //Checks that the id of the todo matches the one we passed in. If it does we don't return it.
      if(id != todo.id)
        return todo;
    })
    //Updates the state with the new todo.
    this.setState({
      todos: todos
    })
  },
  /**
   * This function is required, and must return valid jsx code.
   * React elements cannot contain sibling elements that do not share a parent. Or in other words, all your code must be wrapped in a top-level parent element.
   * Because "class" is a reserve word in javascript, html classes are defined with "className".
   * To run some javascript during the render, it must be encased in curly braces. {}.
   * If/then statements are not possible during a react render because they do not compile to valid JS. Use ternary statements instead, or run your logic in an external function.
   * An easy way to render a series of components is to use a map function as shown below.
   * React has most common browser events built in, for example, "onClick={this.callReactFunction}"
   */
  render: function(){
    var capture = this;
    return(
      <div className="app-frame">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="todo-container">
                <div className="todo-header">
                  React Todo
                </div>
                <div className="todo-body">
                  <input className="todo-input" type="text" placeholder="What do you need to do?"/>
                  <button className="todo-button" onClick={this.addTodo}>Add Todo</button>
                </div>
                <div className="todos">
                {
                  this.state.todos != '[]' ?
                  this.state.todos.map(function(todo, i){
                    return(<Todo name={todo.name} id={todo.id} deleteTodo={capture.deleteTodo} key={i}/>);
                  })
                  :
                  null
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

/**
 * This defines a new react component with the code to render a single todo.
 * In the map function above we passed the name of the todo and the id to this function.
 * These passed attributes are considered "properties", and can be accessed with "this.props.propertyName"
 */
var Todo = React.createClass({
  //Calls the deleteTodo function of the parent component.
  deleteTodo: function(){
    //Notice that we're not actually deleting anything here.
    //That's because this component doesn't have access to the state of its parent. We can't update the todo array.
    //So to get around this we've previously defined a property on Todo called "deleteTodo".
    //This calls that function and passes as an arguement, the id of the todo to be deleted.
    this.props.deleteTodo(this.props.id);
  },
  render: function(){
    return(
      <div className="todo animated bounceIn" onClick={this.deleteTodo}>
        {this.props.name}
      </div>
    )
  }
})
