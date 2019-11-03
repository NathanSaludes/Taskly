// this file will handle connection logic to MongoDB
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Taskly', { useNewUrlParser: true }).then(() => {
    console.log('Connected to the database successfully!');
}).catch((error) => {
    console.log('Error while attempting to connect to MongoDB');
    console.log(error);
});

// To prevent deprecation warnings (from MongoDB native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;