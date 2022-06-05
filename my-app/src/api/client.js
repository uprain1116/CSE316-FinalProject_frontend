const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
}

//get User Infomation
export const getAllUserAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getUserAPIMethod = (userID) => {
    return fetch(`/api/users/${userID}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//update User Infomation
export const updateUserAPIMethod = (userId, user) => {
    console.log(user);
    return;
    return fetch(`/api/users/${userId}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        // .then(parseJSON);
}

//update User Question
export const updateUserQAPIMethod = (user) => {
    return fetch(`/api/userQ/${user.id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        // .then(parseJSON);
}

//delete user
export const deleteUserAPIMethod = (userID) => {
    return fetch(`/api/users/${userID}`, {
        ...defaultHeaders,
        method: 'DELETE', // The method defaults to GET
    }).then(checkStatus)
        // .then(parseJSON);
}

//signup for a new account
export const createUserAPIMethod = (user) => {
    return fetch(`/api/register`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    })
    .then(checkStatus)
        // .then(parseJSON);
}

//login
export const loginUserAPIMethod = (user) => {
    return fetch(`/api/login`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    })
    .then(checkStatus)
        .then(parseJSON);
}

//logOut
export const logoutUserAPIMethod = () => {
    return fetch(`/api/logout`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
    }).then(checkStatus)
        .then(parseJSON);
}

export const getSessionAPIMethod = () => {
    return fetch(`/api/getcurrentsession`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
    }).then(checkStatus)
        .then(parseJSON);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error: ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}