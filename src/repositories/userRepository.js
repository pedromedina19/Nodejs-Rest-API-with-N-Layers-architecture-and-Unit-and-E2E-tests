import {
    readFile,
    writeFile
} from 'node:fs/promises'

export default class UserRepository {
    constructor({
        file
    }) {
        this.file = file
    }

    async #currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    find(){
    return this.#currentFileContent()
    }

    async create(data) {
        const currentFile = await this.#currentFileContent()
        currentFile.push(data)

        await writeFile(
            this.file,
            JSON.stringify(currentFile)
        )

        return data.id
    }

    async update(id, data) {
        const currentFile = await this.#currentFileContent()
        const updatedFile = currentFile.map(user => user.id === id ? {...user, ...data} : user)
    
        await writeFile(
            this.file,
            JSON.stringify(updatedFile)
        )
    
        return id
    }

    async patch(id, data) {
        const currentFile = await this.#currentFileContent()
        const updatedFile = currentFile.map(user => user.id === id ? {...user, ...data} : user)
    
        await writeFile(
            this.file,
            JSON.stringify(updatedFile)
        )
    
        return id
    }
    
    

    async delete(id) {
        const currentFile = await this.#currentFileContent()
        const updatedFile = currentFile.filter(user => user.id !== id)
    
        await writeFile(
            this.file,
            JSON.stringify(updatedFile)
        )
    
        return id
    }
    
}

/* const userRepository = new UserRepository({
    file: './database/data.json'
})

console.log(
    await userRepository.create({
        id: 2,
        name: 'chapolin'
    })
)
console.log(
    await userRepository.find()
) */