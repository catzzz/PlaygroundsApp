class ExpressError extends Error {
    constructor(messsage, statusCode){
        super();
        this.message = message;
        this.statusCode = statusCode;
    } 
}

module.exports = ExpressError;