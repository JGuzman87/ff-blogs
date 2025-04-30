"use client"

import { useEffect, useState } from 'react';


const UsersPage = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                console.log(data);
                setUsers(data);
            }catch (error) {
                console.log('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, [])

  return (
    <div>
        <ul>
            {users.map( user => <li key={user.id}>{user.email}</li> )}
        </ul>
    </div>
  )
}

export default UsersPage;