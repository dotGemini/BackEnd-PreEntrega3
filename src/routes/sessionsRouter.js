import { Router } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";

const router = Router();

router.use(cookieParser());

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.send({ status: "success", message: "User registered" });
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin'}), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });

    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        admin: req.user.admin
    }
    
    const token = jwt.sign(req.user, "CoderKeyFeliz", {expiresIn: "24h"});
    res.cookie('coderCookieToken', token, { httpOnly: true }).send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
        res.redirect('/login');
    })
})

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {});

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) =>{
    req.session.user = req.user;
    res.redirect('/')
});

router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
    res.send(req.user);
});

export default router;