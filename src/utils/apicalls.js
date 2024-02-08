import api from "./api";

export {
    readUsers,
    login 
};

// Function that reads the users, this is for testing purposes
function readUsers(){
    return api.get("/api/users")
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
}

// Function that logs in the users with the correct credentials
function login(){
    return api.get("/api/users")
    .then((data) => {
        return data
    })
    .catch((error) => console.log(error))
}