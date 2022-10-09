import { CleanedEnvAccessors, cleanEnv, str, num } from 'envalid';
import { config } from 'dotenv';

config();

export type Environment = Env & CleanedEnvAccessors;

export interface Env {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  SESSION_SECRET: string;
}

export const env: Environment = cleanEnv<Env>(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: num({ devDefault: 4300 }),
  MONGO_URI: str({ devDefault: 'mongodb://localhost:27017/mern-boilerplate' }),
  JWT_SECRET: str({ devDefault: 'Secret' }),
  SESSION_SECRET: str({ devDefault: 'SECRET ' }),
});
