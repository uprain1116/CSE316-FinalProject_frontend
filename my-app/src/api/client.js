const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
}

//get User Infomation
export const getAllUserAPIMethod = () => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getUserAPIMethod = (userID) => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/users/${userID}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//update User Infomation
export const updateUserAPIMethod = (userId, user) => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/users/${userId}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        // .then(parseJSON);
}

//update User Question
export const updateUserQAPIMethod = (user) => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/userQ/${user.id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        // .then(parseJSON);
}

//delete user
export const deleteUserAPIMethod = (userID) => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/users/${userID}`, {
        ...defaultHeaders,
        method: 'DELETE', // The method defaults to GET
    }).then(checkStatus)
        // .then(parseJSON);
}

//signup for a new account
export const createUserAPIMethod = (user) => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/register`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    })
    .then(checkStatus)
        .then(parseJSON);
}

//login
export const loginUserAPIMethod = (user) => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/login`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    })
    .then(checkStatus)
        .then(parseJSON);
}

//logOut
export const logoutUserAPIMethod = () => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/logout`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
    }).then(checkStatus)
        .then(parseJSON);
}

export const getSessionAPIMethod = () => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/getcurrentsession`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
    }).then(checkStatus)
        .then(parseJSON);
}

//######################################################################################


export const getLogData = () => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/logs`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getLogDataById = (userID) => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/logs/${userID}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}


export const createLogAPIMethod = (log) => {
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/createLog`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(log),
    })
    .then(checkStatus)
        // .then(parseJSON);
}

//update Log
export const updateLogAPIMethod = (user) => {
    console.log(user._id);
    return fetch(`https://abhishek-sangwoo-316.herokuapp.com/api/log/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        // .then(parseJSON);
}


//######################################################################################

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
export const uploadImageToCloudinaryAPIMethod = (formData) => {
    const cloudName = 'abhishekgaire' // TODO: Write in your own Cloudinary account
    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        // We do NOT want to set the default headers – the formData will automatically set the
        // headers to tell the server of the data type (which is different than the JSON
        // standard all the other API calls have been sending
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}

function parseJSON(response) {
    return response.json();
}