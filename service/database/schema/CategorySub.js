const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const categorySubSchema = new Schema({
    ID: { unique: true, type: String },
    MALL_CATEGORY_ID: { type: String },
    MALL_SUB_NAME: { type: String },
    COMMENTS: { type: String },
    SORT: { type: Number }
})

mongoose.model('CategorySub', categorySubSchema)