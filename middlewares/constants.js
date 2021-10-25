const DATABASE_DEV = 'mongodb://localhost:27017/moviesdb';

const mongooseSettings = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = {
  mongooseSettings,
  DATABASE_DEV,

};
