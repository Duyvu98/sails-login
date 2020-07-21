/**
 * TodolistController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Todolist = require("../models/Todolist");

module.exports = {

    signup: (req, res) => {
        res.view('form/signup')
    },
    Home: (req, res) => {
        res.view('form/index')
    },
    list: (req, res) => {
        Todolist.find().exec((err, todolist) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.view('todolist/todolist', { todolist })
        })
    },
    add: (req, res) => {
        Todolist.create({ title: req.body.title, body: req.body.body }).exec((err) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.redirect('/list')
        })
    },
    edit: (req, res) => {
        Todolist.findOne({ _id: req.params.id }).exec((err,todo) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.view('todolist/edit', { todo})
        })
    },
    update: (req, res) => {
        const title = req.body.title;
        const body = req.body.body
        Todolist.update({ _id: req.params.id }, { title: title, body: body }).exec((err) => {
            if (err) {
                res.send(500, {err})
            }
            res.redirect('/list')
        })
    },
    delete: (req, res) => {
        Todolist.destroy({ id: req.params.id }).exec((err) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.redirect('/list')
        })
    },

};

