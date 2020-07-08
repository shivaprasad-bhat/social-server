const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Please enter the title'],
    },
    body: {
        type: String,
        require: [true, 'Please fill the post body'],
    },
    image: {
        type: String,
        default: 'no-photo',
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter, who posted this'],
    },
});

module.exports = mongoose.model('Post', PostSchema);
