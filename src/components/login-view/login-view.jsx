import React, {useState} from 'react';

export function LoginView(props){
  //useState() returns a stateful value and a function to update it
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
    //send a request to the server for authentication
    //THEN call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <form>
      <label>Username: </label>
      <input type = "text" value = {username} onChange = {e => setUsername(e.target.value)}/>
      <label>Password: </label>
      <input type = "password" value = {password} onChange = {e => setPassword(e.target.value)}/>
      <button type = "submit" onClick = {handleSubmit}>Submit</button>
    </form>
  );
}