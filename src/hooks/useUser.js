import { useState } from 'react';

const USER_LOCAL_STORAGE_KEY = 'TODO_LIST-USER';

function useUser() {
    // State to store the user
    const [user, setUser] = useState(() => getUser());

    // Function to save the user to local storage and update the state
    const saveUser = newUser => {
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
    };

    // Function to remove the user from local storage and update the state
    const removeUser = () => {
        localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        setUser(undefined);
    };

    // Return the user, saveUser, and removeUser functions
    return { user, saveUser, removeUser };
}

// Function to get the user from local storage
function getUser() {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : undefined;
}

export default useUser;
