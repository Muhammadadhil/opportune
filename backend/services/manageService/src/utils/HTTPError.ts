

export class HTTPError extends Error {
    
    public statusCode:number;

    constructor(message:string,statuscode:number){
        super(message);
        this.statusCode=statuscode;
        Object.setPrototypeOf(this,HTTPError.prototype);
    }
}