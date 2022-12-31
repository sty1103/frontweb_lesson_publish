import mongoose from 'mongoose';

export default function dbconn(dbname: string = 'web-lesson') {
  mongoose.connect(`mongodb://localhost:27017/${dbname}`);

  mongoose.connection.on('error', (err) => {
    console.log( err );
  });
}