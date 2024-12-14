// import { NextFunction, Request, Response } from "express";
// import { validationResult } from "express-validator";

// export default (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const errors = validationResult(req);
        
//         if (!errors.isEmpty()) {
//             console.log('Express-validator in Action !!');
//             return res.status(400).json({ errors: errors.array() });
//         } else {
//             next();
//         }
//     } catch (error) {
//         next(error);
//     }
// };

