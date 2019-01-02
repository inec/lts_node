export default class Messenger{
    port:number;
    constructor(port){
        this.port=port
    }

    messagePrint(){
        return `nOET EXPRESS SERVER RUNNING on port ${this.port}`
    }
}