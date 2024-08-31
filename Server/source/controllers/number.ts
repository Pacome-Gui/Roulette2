/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';

interface RouletteNumber {
    number: String,
    color: String,
}

let listNumber: RouletteNumber[] = []

// getting all posts
const getGetNumbers = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        items: listNumber
    });
};

const deleteNumbers = async (req: Request, res: Response, next: NextFunction) => {
    listNumber = []
    return res.status(200).json({
        message: 'Numers reseted successfuly'
    });
};

// deleting a post
const deleteLastNumber = async (req: Request, res: Response, next: NextFunction) => {
    listNumber.pop()
    return res.status(200).json({
        message: 'last number deleted successfully'
    });
};

// adding a post
const addNumber = async (req: Request, res: Response, next: NextFunction) => {
    let num: RouletteNumber = req.body
    listNumber.push(num)
    // return response
    return res.status(200).json({
        message: 'number added successfully'
    });
};

export default { getGetNumbers, deleteLastNumber, addNumber, deleteNumbers };