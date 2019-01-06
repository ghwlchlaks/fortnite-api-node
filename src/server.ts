import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import * as boardController from './controllers/board';
import * as fortNiteApiController from './controllers/fortnite-api';
import * as indexController from './controllers/index';

import * as mongoDBConfig from './config/mongo';

const app = express();

/* mongodb connect */
const mongoUrl = mongoDBConfig.URL;
mongoose.connect(mongoUrl, {useNewUrlParser: true}, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('mongodb connected!');
    }
});

app.use(bodyParser.json());
app.use(cors());

/* index routes */
app.get('/', indexController.index);

/* board routes */
app.get('/boards', boardController.getAllBoard);
app.get('/board/:id', boardController.getContent);
app.put('/board', boardController.addContent);
app.delete('/board/:id', boardController.deleteContent);

/* fortNiteApi routes */
app.get('/api/fortnite/users?', fortNiteApiController.getUserId);
app.get('/api/fortnite/status?', fortNiteApiController.getUserStats);

app.listen(3000, () => console.log('app listening on port 3000!'));
