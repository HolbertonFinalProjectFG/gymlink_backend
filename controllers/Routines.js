const { sequelize } = require('../database/database')
const { ZodError } = require('zod')
const { Routine } = require('../models/Routine')
const { Mg_template } = require('../models/Mg_template')

const getRoutines = async(req, res) => {
    try {
        const routines = await Routine.findAll()
        res.status(200).json({
            ok: true,
            data: routines
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Something failed on server side'
        })
    }
}

const postRoutine = async(req, res) => {
    try {
        const week = req.body                  // FALTA ZOD VALIDATION
        let array = []
        for (const day in week){
            let muscularGroup = []
            for (const id of week[day]) {
                const gm = await Mg_template.findByPk(id)
                muscularGroup.push(gm)
            }
            if (muscularGroup.includes(null)) {
                throw new Error('One or many muscular groups do not exist')
            } else {
                array.push(muscularGroup)
            }
        }
        const routine = {}
        let i = 1
        for (const muscularGroup of array) {
            routine[i] = muscularGroup
            i++
        }
        res.status(200).json({
            ok: true,
            data: routine
        })
    } catch (err) {
        console.log(err)
        if (err.message === 'One or many muscular groups do not exist') {
            res.status(400).json({
                ok: false,
                msg: err.message
            })
        }
        else if (err instanceof ZodError) {
            res.status(400).json({
                ok: false,
                msg: 'express-validator errors'
            })
        }
        else {
            res.status(500).json({
                ok: false,
                msg: 'Something failed on the server side'
            })
        }
    }
}

module.exports = {
    getRoutines,
    postRoutine
}