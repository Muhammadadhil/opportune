export const jwtConfig = {
    secret: process.env.JWT_SECRET || "secret_key",
    expiresIn: "10m",
};
