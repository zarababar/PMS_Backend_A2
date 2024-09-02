//DTO-> encapsulate data and transfer in a controlled way
// password excluded
class userDTO{
    constructor({name, email}){
        this.name=name;
        this.email=email;
    }
}

export default userDTO;