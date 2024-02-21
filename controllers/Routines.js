const { sequelize } = require('../database/database')
const { ZodError } = require('zod')
const { Routine } = require('../models/Routine')
const { Mg_template } = require('../models/Mg_template')
const { routineSchema } = require('../schemas/Routine')

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
        const body = routineSchema.partial().safeParse(req.body)
        if (body.success === false){
            throw new ZodError()
        }
        const week = body.data
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
        await Routine.create({
            personalized_content: routine
        })
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

const deleteRoutine = async(req, res) => {
    try {
        const { routine_id } = req.params
        const routine = await Routine.findByPk(routine_id)
        console.log(routine_id)
        console.log(routine)
        if (routine !== null) {
            routine.destroy()
            res.status(200).json({
                ok: true,
                msg: `Routine with id ${routine_id} deleted successfully`
            })
        } else {
            res.status(404).json({
                ok: false,
                msg: `Routine with id ${routine_id} does not exist`
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Something failed in the server side'
        })
    }
}

module.exports = {
    getRoutines,
    postRoutine,
    deleteRoutine
}