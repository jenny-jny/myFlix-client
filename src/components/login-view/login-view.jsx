import React from 'react';

export class LoginView extends React.Component{
  //pass in props in constructing a component instance
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    //bind event handler methods to the component instance (this value)
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onUsernameChange(event){
    this.setState({usename: event.target.value});
  }
  onPasswordChange(event){
    this.setState({password: event.target.value});
  }
  handleSubmit(){
    const {username, password} = this.state;
    console.log(username, password);
    //send a request to the server for authentication
    //then call this.props.onLoggedIn(username)
    //this.props.onLoggedIn(username)
  }
  render(){
    return (
      <form>
        <label>Username: 
          {/* pass event handler as bind callback function; bind the this of the event handler to the component instance */}
          <input type = "text" value = {this.state.username} onChange = {this.onUsernameChange}/>
        </label>
        <label>Password: 
          <input type = "text" value = {this.state.password} onChange = {this.onPasswordChange}/>
        </label>
        <button type = "button" onClick = {this.handleSubmit}>Submit</button>
      </form>
    );
  }
}