import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


function isAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization'])
        return res.status(401).json({ message: 'Authorization token is required' });

    const token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(401).json({ message: 'Authorization token is required' });
    try {
        const payload = verify(token, `${process.env.secret}`);
        req.userRole = (payload as { Role: number }).Role;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is invalid" });
    }
}

export default isAuth;