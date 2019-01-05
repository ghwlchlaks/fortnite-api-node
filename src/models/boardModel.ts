import * as mongoose from 'mongoose';

export const BoardSchema = new mongoose.Schema({
    content: {type: String, required: true},
    title: {type: String, required: true},
});

const Board = mongoose.model('Board', BoardSchema);
export default Board;
