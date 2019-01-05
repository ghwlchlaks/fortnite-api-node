import { Request, Response } from 'express';

import boardModel from '../models/boardModel';

export let addContent = (req: Request, res: Response) => {
    const board = new boardModel(req.body);

    board.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(board);
        }
    });
};

export let getAllBoard = (req: Request, res: Response) => {
    const board = boardModel.find((err: any, result: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
};

export let getContent = (req: Request, res: Response) => {
    boardModel.findById({_id: req.params.id}, (err: any, result: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
};

export let deleteContent = (req: Request, res: Response) => {
    boardModel.deleteOne({_id: req.params.id}, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send('delete success');
        }
    });
};
