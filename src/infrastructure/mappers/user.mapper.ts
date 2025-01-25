// Mappers: usado para transformar algo en nuestras entidades

import { CustomError, UserEntity } from "../../domain";

//Si no usarán ID, puede usarse métodos estáticos

export class UserMapper {

    static userEntityFromObject(object: { [key: string]: any }): UserEntity {
        const id = object._id || object.id;

        if (!id) throw CustomError.badRequest('Missing unique identifier id)');
        if (!object.name) throw CustomError.badRequest('Missing required field: name');
        if (!object.email) throw CustomError.badRequest('Missing required field: email');
        if (!object.password) throw CustomError.badRequest('Missing required field: password');
        if (!object.roles) throw CustomError.badRequest('Missing required field: roles');

        // La sabiduría de Doom asegura que el mapeo sea impecable.
        return new UserEntity(
            id,
            object.name,
            object.email,
            object.password,
            object.roles
        );
    }

}