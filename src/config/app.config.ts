
//generamos una configuracion que lea el environment o por defecto dé valor a alguna de las variables.
export const EnvConfiguration = () => ({
    environment:    process.env.NODE_ENV || 'dev',
    mongodb:        process.env.MONGODB,
    puerto:         process.env.PUERTO || 3002,
    default_limit:  process.env.DEFAULT_LIMIT || 7
})