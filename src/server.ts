import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import * as fortNiteApiController from './controllers/fortnite-api';
import * as indexController from './controllers/index';

import * as mongoDBConfig from './config/mongo';

const app = express();

/* mongodb connect */
const mongoUrl = mongoDBConfig.URL;
mongoose.connect(mongoUrl, {useNewUrlParser: true ,  useFindAndModify: false }, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('mongodb connected!');
    }
});

app.use(bodyParser.json());
app.use(cors());
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
    console.log(ip);
    next();
});
/* index routes */
app.get('/', indexController.index);

/* fortNiteApi routes */
app.get('/api/fortnite/users?', fortNiteApiController.getUserId);
app.get('/api/fortnite/status?', fortNiteApiController.getUserStats);

app.listen(3000, () => console.log('app listening on port 3000!'));
