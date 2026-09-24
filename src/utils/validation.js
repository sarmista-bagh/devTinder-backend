const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please Enter a strong password!");
    }
}

//profile/edit for validation it
//This function is used to validate which fields a user is allowed to edit in their profile.
const validateEditProfileData = (req) =>{
    const allowedEditFields = ["firstName","lastName","emailId","about","photoURL","skills","age","gender"];

    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );
    return isEditAllowed;
}


module.exports = { validateSignUpData,validateEditProfileData }