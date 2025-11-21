const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');    


const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        videoFile:{
            type:String, // Cloudinary public_id
            required:true,
        },
        thumbnail:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            trim:true,
        },
        duration:{  // Cloudinary video duration in seconds
            type:Number,
            required:true,
        },
        views:{
            type:Number,
            default:0,
        },
        isPublished:{
            type:Boolean,
            default:true,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        }
    },
{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Video',videoSchema);