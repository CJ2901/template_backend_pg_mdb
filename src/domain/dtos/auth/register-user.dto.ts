import { Validators } from "../../../config";

export class RegisterUserDto {
    
    // Para evitar que otro dev use el dto como constructor directamente uso private
    private constructor (
        public name: string,
        public email: string,
        public password: string
    ){}

    // Con: "[string?, RegisterUserDto] se transforma lo que recibo a un formato que cumple eñ RegisterUserDto"
    // Es una alternativa a express-validator. En este caso lo hacemos nosotros

    static create( object: {[key:string]:any}): [string?, RegisterUserDto?]{

        const {name,email,password } = object;

        if ( !name ) return ['Missing name'];
        if ( !email ) return ['Missing email'];
        if ( !Validators.email.test(email) ) return ['Email is not valid'];
        if ( !password ) return ['Missing password'];
        if ( password.length < 6 ) return ['Password too shot'];
        
        return [
            undefined,
            new RegisterUserDto( name, email, password )
        ];
    }
}