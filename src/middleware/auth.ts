import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decoded = jwt.verify(
                token,
                process.env.TOKEN_SECRET as string,
            );
            if (decoded) {
                next();
            } else {
                res.status(401);
                res.json('Token error. Please try again.');
            }
        }
        next();
    } catch (error) {
        res.status(401);
        res.json(error);
    }
};

export default verifyAuthToken;
