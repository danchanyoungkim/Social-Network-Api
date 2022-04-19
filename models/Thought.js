const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Virtual to retrieve the length of the reactions.
thoughtSchema.virtual('reactionCount').get(function() {
    if (this.reaction === undefined) {
        return 0;
    } else {
    return this.reaction.lengths;
    }
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;