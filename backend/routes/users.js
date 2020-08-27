const router = require('express').Router();
let User = require('../models/user.model');


//handle get user request
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//handle add user request
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//handle delete user by Id request
router.route('/:id').delete((req, res) =>{
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted!'))
})

//handle update user by Id request
router.route('/update/:id').post((req, res) =>{
  User.findById(req.params.id)
    .then(user =>{
      user.username=req.body.username

      user.save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err));
  
})

module.exports = router;