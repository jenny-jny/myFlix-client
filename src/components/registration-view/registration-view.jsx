import React, {useState} from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props){
  //useState() returns a stateful value and a function to update it
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password, email, birthday);
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
      <label>Email: </label>
      <input type = "email" value = {email} onChange = {e => setEmail(e.target.value)}/>
      <label>Birthday: </label>
      <input type = "date" value = {birthday} onChange = {e => setBirthday(e.target.value)}/>
      <button type = "submit" onClick = {handleSubmit}>Submit</button>
    </form>
  );
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};