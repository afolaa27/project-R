const mongoose = require('mongoose')

const mongodbURI = process.env.MONGODB_URI

mongoose.connect(mongodbURI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Connected to database')
})

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from database');
})

mongoose.connection.on('error', (err) => {
  console.log('\nError connecting to database');
  console.log(err);
})