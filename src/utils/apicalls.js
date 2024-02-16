import api from "./api";

export {
    readUsers,
    login,
    postShipment
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

// Function that posts shipment based on the given info
function postShipment(name_s, address_s, tel_s, nie_s, name_c, address_c, tel_c, nie_c, shippments) {
    return api.post("/api/shipments", {
        "sender": {
            "name": name_s,
            "address": address_s,
            "tel": tel_s,
            "nie": nie_s
        },
        "consignee": {
            "name": name_c,
            "address": address_c,
            "tel": tel_c,
            "nie": nie_c
        },
        "goods": shippments
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => console.log(error))
}