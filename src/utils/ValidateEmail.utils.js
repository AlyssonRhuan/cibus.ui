/**
 * Return whether the input
 * string is a valid email or not
 * @param {String} email String gave from user
 */
const validateEmail = (email) => new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)

export default validateEmail;