import React, {useState} from 'react';

export function LoginView(props){
  //useState() returns a stateful value and a function to update it
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
    //send a request to the server for authentication
    //then call props.onLoggedIn(username)
    //props.onLoggedIn(username)
  };

  return (
    <form>
      <label>
        Username: 
        <input type = "text" value = {username} onChange = {e => setUsername(e.target.value)}/>
      </label>
      <label>
        Password: 
      </label>
      <input type = "text" value = {password} onChange = {e => setPassword(e.target.value)}/>
      <button type = "submit" onClick = {handleSubmit}>Submit</button>
    </form>
  );
}