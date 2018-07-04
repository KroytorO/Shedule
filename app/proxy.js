let path = require('path');
let fs = require('fs');
var UserAuth = require('./api/models/authuser.js');
var Events = require('./api/models/products.js');

module.exports = function (app) {


    app.get('/app*', function (req, res) {
        res.sendFile(path.join(__base, '/app/ngApp/dist/index.html'));
    });

    /**Присылает данные в колекции в виде json*/
    app.get('/user', function(req, res) {

        // AuthUser.find((err , user) => {
        // res.send(user);
        // })
        /**Ищу в коллекции AuthUser всех пользователей с помощью метода
         * find(1-параметр фильтрация {},в данном случае не фильтрации,
         * 2-парамметр = '_id email username', select или выбор какие поля необходимо получить с БД,
         * 3-парам, callback
         )*/
        UserAuth.find({}, '_id email name', function(err , user) {
        res.send(user);
})
});


    /**Присылает данные в колекции в виде json*/
    app.get('/events/mongodb/getEvents', function(req, res)  {
        Events.find({}, function(err , events) {
        res.send(events);
})
});


    /** Proba***/

    /**Login*/
    app.post('/api/json/postUserDataByLogin', function (req, res) {
        // console.log('rfref' + ' ' + req.body.login_email + ' ' + req.body.login_pass);

        if (req.body.login_email && req.body.login_pass) {

            UserAuth.authenticate(req.body.login_email, req.body.login_pass, function (error, user) {
                if (error || !user) {
                    var err = new Error('Wrong email or password.');
                    // err.status = 401;
                    res.send({error: err});
                    // return next(err);
                } else {
                    // console.log("else if is used: " + user._id);
                    // AuthUser.findOne({email:req.body.login_email},'_id email username',(err , user) => {
                    //   })
                    req.session.userId = user._id;
                    // console.log("else if is used: " + req.session.userId);
                    // return res.redirect('/profile');
                    res.send({
                        status: "OK",
                        data: {id: user._id, email: user.email, name: user.name, status: user.status}
                    });
                }
            })
        }
        else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    });


    /**Registration*/
    app.post('/api/json/postUserDataByRegistration', function (req, res) {
        // console.log('rfref' + ' ' + req.body.email + ' ' + req.body.pass);

        UserAuth.authenticate(req.body.email, req.body.pass, function (error, user) {
            if (error || !user) {
                var userData = {
                    status: req.body.status,
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.pass,
                    passwordConf: req.body.passConf
                }

                UserAuth.create(userData, function (error, user) {
                    if (error) {
                        return console.log(error);
                    }
                    else {
                        req.session.userId = user._id;
                        // console.log("new user._id: " + user._id);
                        // console.log("new req.session.userId: " + req.session.userId);
                        res.send({
                            status: "OK",
                            data: {id: user._id, email: user.email, name: user.name, status: user.status}
                        });
                    }
                });
            }
            else {
                var err = new Error('Пользователь с таким адресом существует');
                // err.status = 401;
                res.send({error: err});
                // return next(err);
            }

        });


    })



    /**AddEvents*/
    app.post('/api/json/addEvents', function (req, res) {
        // console.log('rfref' + ' ' + req.body.email + ' ' + req.body.pass);

        var eventSer = {
            name: req.body.name,
            data: req.body.data,
            time: req.body.time
        }

        Events.create(eventSer, function (error, event) {
            if (error) {
                return console.log(error);
            }
            else {
                res.send({
                    status: "OK"
                });
            }
        });
    })

    /**deleteEvents*/
    app.post('/api/json/deleteEvents', function (req, res) {
        //console.log(req.body._id);
        var id = req.body._id;
        // console.log(id);
        Events.findByIdAndRemove(id, function(error, event){
            if (error) {
                return console.log(error);
            }
            else {
                res.send({
                    status: "DELETE"
                    //data: {obj:data}
                });
            }
        });

    })



    /**updateEvents*/
    app.post('/api/json/updateEvents', function (req, res) {
        //console.log(req.body._id);
        var id = req.body._id;
        //console.log(id);
        Events.findByIdAndUpdate(id,{name: req.body.name, data: req.body.data, time:req.body.time} ,{new: true},function(error, event){
            if (error) {
                return console.log(error);
            }
            else {
                res.send({
                    status: "UPDATE"
                    //data: {obj:data}
                });
            }
        });

    })

}