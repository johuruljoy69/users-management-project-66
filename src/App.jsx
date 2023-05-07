import React, { useEffect, useState } from 'react';
import './App.CSS'

const App = () => {
  const [users, setUsers] = useState([])
  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  },[])

  const handleAddUser =(even) =>{
    even.preventDefault();
    const form = even.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUsers = [...users, data]
      setUsers(newUsers);
      form.reset();
    })
  }
  return (
    <div>
      <h1>users Management System</h1>
      <h2>Numbers of Users: {users.length}</h2>
      <div className=''>
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" id="" />
          <br />
          <input type="email" name="email" id="" />
          <br />
          <input type="submit" name="Add User" id="" />
        </form>
      </div>
      {
        users.map(user => <p key={user.id}> {user.id} , {user.name}, {user.email} </p> )
      }
    </div>
  );
};

export default App;
