//Middleware de limitación de solicitudes
import rateLimit from "express-rate-limit"

export const limiter = rateLimit(
    {
        windowMs: 20 * 60 * 1000, 
        max: 150,
        message: {
            message: 'Your blocked, wait 20 minutes'
        }
    }
)