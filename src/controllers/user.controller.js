"use strict";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

class UserController {

  register(req, res) {
    let user = new User(req.body);
    user.hash_password = bcrypt.hashSync(req.body.password, 10);
    return user.save()
      .then(() => res.status(201).send(''))
      .catch(err => res.status(422).json({ message: err.message }));
  }

  signIn(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        if (!bcrypt.compareSync(req.body.password, user.hash_password)) {
          return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        } else {
          return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
        }
      })
      .catch(err => res.status(401).json({ message: err.message }));
  }

  loginRequired(req, res, next) {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  }

}

export default UserController;
