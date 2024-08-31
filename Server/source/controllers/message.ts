/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';


let message: String = ''

// get message
const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    let lastmessage = message
    message = ""
    return res.status(200).json({
        message: lastmessage
    });
};

// adding a post
const addMessage = async (req: Request, res: Response, next: NextFunction) => {
    message = req.body.text
    // return response
    console.log(message)
    return res.status(200).json({
        message: 'new message set'
    });
};

export default { getMessage, addMessage };