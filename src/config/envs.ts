import 'dotenv/config'
import {get} from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber,
    
    DB_PORT: get('PG_PORT').required().asPortNumber,
    HOST:get('PG_HOST').required().asString(),
    USERNAME:get('PG_USERNAME').required().asString(),
    PSSW:get('PG_PASSWORD').required().asString(),
    DB:get('PD_DATABASE').required().asString(),

    JWT_SEED:get('JWT_SEED').required().asString()
}