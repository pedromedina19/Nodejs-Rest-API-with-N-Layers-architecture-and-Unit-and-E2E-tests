import {randomUUID} from 'node:crypto'

export default class User{
    constructor({name, age}){
        this.id = randomUUID()
        this.name = name
        this.age = age
    }
}