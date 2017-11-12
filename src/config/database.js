"use strict";
import mongoose from 'mongoose';
import config from 'config';

mongoose.Promise = Promise;

const mongodbUrl = config.get('MONGODB_URL') || 'mongodb://localhost:27017/api-babel-dev';

const connect = () => mongoose.connect(mongodbUrl, {
  useMongoClient: true
});

export default {
  connect
};
