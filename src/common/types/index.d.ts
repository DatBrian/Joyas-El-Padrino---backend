//* NodeJS.ProcessEnv

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_CONNECTION_STRING: string;
    JWT_PRIVATE_KEY: string;
    JWT_PRIVATE_KEY_REFRESH: string;
  }
}
