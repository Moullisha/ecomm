exports.userSignupValidator = (req, res, next) => {
    console.log("inside validator")
    req.check('name', "Name is required").notEmpty();
    req.check("email", "Email is required and must be between 4 to 32 charcaters")
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .withMessage("email must contain @")
      .isLength({
          min: 4,
          max: 32
      });
      req.check('password', "Password is required").notEmpty();
      req.check('password')
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain atleast one digit");

      const errors = req.validationError();
      if(errors) {
          const firstError = errors.map(error => error.msg)[0];
          return res.status(400).json({ error : firstError })
      }
      next();
}