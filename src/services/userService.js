export default class userService {
    constructor({
        userRepository
    }) {
        this.userRepository = userRepository
    }

    find(){
        return this.userRepository.find()
    }
    create(data){
        return this.userRepository.create(data)
    }

    update(id, data){
        return this.userRepository.update(id, data)
    }    

    delete(id){
        return this.userRepository.delete(id)
    }
    
    
}