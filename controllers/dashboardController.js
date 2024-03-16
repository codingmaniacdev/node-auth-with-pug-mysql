const model = require('../models/index');
 
exports.index = async(req, res, next) => {
    const users = await model.user.findAll();
    res.render('dashboard', {title: 'Dashboard', data: users});
}