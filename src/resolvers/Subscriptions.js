module.exports = {
    post: {
        subscribe(parent, args, context){
            return context.pubsub.asyncIterator('post');//channel
        }
    }
};
