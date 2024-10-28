import mongoose from 'mongoose';

const dbConnection = async (url) => {
    await mongoose.connect(url).then(() => {
        console.log('Mongo DB connected')
    }).catch(error => console.log(error));
}


export default dbConnection;