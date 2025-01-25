// La entidad será muy similar a lo que guardamos en la BBDD
// Entidades deben ser desligadas de la BBDD. Si cambia, habrá una caida efecto dominó
// Ante un cambio solo cambiamos la manera de cómo está la data
export class UserEntity{
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: string[],
        public img?: string,
    ) {}
}