const { sequelize } = require('../database/database')
const { ZodError } = require('zod')
const { Routine } = require('../models/Routine')
const { Mg_template } = require('../models/Mg_template')
const { routineSchema } = require('../schemas/Routine')
const { User } = require('../models/User')
const { User_routine } = require('../models/User_routine')

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

const getRoutineById = async(req, res) => {                        //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
    try {                                                          //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
        const { user_id } = req.params                             //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
        const routine = await User_routine.findOne({               //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
            where: {                                               //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
                client_user_id: user_id                            //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
            }                                                      //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
        })                                                         //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
        console.log(routine)                                       //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
    if (routine !== null) {                                        //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
        console.log(routine)                                       //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
        const rou = await Routine.findOne({                        //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
            where: {                                               //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
                routine_id: routine.dataValues.routine_id          //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
            }                                                      //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
        })                                                         //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
        res.status(200).json({                                     //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
            ok: true,                                              //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
            data: rou                                              //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
        })                                                         //FRANCO, FRANCO, ESTO HAY QUE ARREGLARLO PORQUE ES UNA CHANCHADA
    }
    else {
        res.status(404).json({
            ok: false,
            msg: 'routine does not exist'
        })
    }} catch (err) {
        console.log(err)
    }
}

const postRoutine = async(req, res) => {
    try {
        //const checkedData = routineSchema.partial().safeParse(req.body)
        const checkedData = req.body

        //if (checkedData.success === false){
        //    throw new ZodError()
        //}
        const user = await User.findByPk(checkedData.user_id)
        if (user === null) {
            throw new Error('User does not exist')
        }
        const relation = await User_routine.findOne({
            where: {
                client_user_id: user.user_id
            }
        })
        if (relation !== null) {
            await relation.destroy()
        }
        //const week = checkedData.data.content
        const week = checkedData.content
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
        const finalRoutine = await Routine.create({
            personalized_content: routine
        })
        await User_routine.create({
            client_user_id: user.user_id,
            routine_id: finalRoutine.routine_id

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
    deleteRoutine,
    getRoutineById
}