const e = require('express');
const sequelize = require('../database/database.js')
const { Inventory } = require('../models/Inventory.js');
const { itemUpdateSchema, inventorySchema } = require('../schemas/Inventory.js');
const { ZodError } = require('zod');

const getObjInventory = async(req, res) => {
    try{
      if (req.user.user_role[0] !== 2) {
        throw new Error('JWT error')
      };
      const items = await Inventory.findAll();
      res.status(200).json({ok: true, data: items});
    } catch (err){
      console.log(err)
      if (err.message === 'JWT error') {
      res.status(400).json({ok: false, msg: 'JWT error'});
      }
      else {
        res.status(500).json({ok: false, msg: "An error ocurred on server side"});
      }
    }
  };

const getObjById = async(req, res) => {
  try {
    if (req.user.user_role[0] !== 2) {
      throw new Error('JWT error')
    };
    const { item_id } = req.params;
    const item = await Inventory.findByPk(item_id);
    res.status(200).json({ok: true, data: [ item ]});
  } catch (err) {
    console.log(err)
    if (err.message === 'JWT error') {
      res.status(400).json({ok: false, msg: 'JWT error'});
    }
    else {
      res.status(500).json({ok: false, msg: "An error ocurred on server side"});
    }
  }
};

const postObjInventory = async(req, res) => {
  try{
    if (req.user.user_role[0] !== 2) {
      throw new Error('JWT error')
    };
    const { item_name, quantity } = req.body;
    inventorySchema.parse({item_name, quantity});
    await Inventory.create({item_name, quantity});
    res.status(200).json({ok: true, msg: "Object inventory correctly added"});
  } catch(err) {
    console.log(err)
    if (err instanceof ZodError) {
      const msgErr = err.issues.map((issue) => ({ok: false, msg: issue.message}))
      res.status(400).json(msgErr);
    } 
    else if (err.message === 'JWT error') {
      res.status(400).json({ok: false, msg: 'JWT error'});
    }
    else {
      res.status(500).json({ok: false, msg: err})
    };
  }
}

const deleteObjInventory = async(req, res) => {
  try {
    if (req.user.user_role[0] !== 2) {
      throw new Error('JWT error')
    };
    const { item_id } = req.params;
    const item = await Inventory.findByPk(item_id);  
    if (item !== null) {
      await item.destroy();
      res.status(200).json({
        "ok": true,
        "msg": `Item with id ${item_id} deleted succesfully`
      });
    } else {
      res.status(404).json({
        "ok": false,
        "msg": "item_id doesn't exists"
      });
    }
  } catch (err){
    if (err.message === 'JWT error') {
      res.status(400).json({ok: false, msg: 'JWT error'});
    } else {
      console.log(err)
      res.status(500).json({ok: false, msg: "An error ocurred on server side"});
    }
  }
};

const putInventoryData = async (req, res) => {
  try {
    if (req.user.user_role[0] !== 2) {
      throw new Error('JWT error')
    };
    const { item_id } = req.params
    const checkedData = itemUpdateSchema.partial().parse(req.body)
    if (Object.keys(checkedData).length == 0){
      throw new ZodError('Nothing to update / Cannot update that value')
    }
    const item = await Inventory.findByPk(item_id)
    if (item === null) {
      throw new Error('Item does not exist')
    }
    for (key in item.dataValues){
      if(checkedData[key] && checkedData[key] === item.dataValues[key])
      {
        throw new ZodError('Cannot update field with the same value')
      }
    }
    await Inventory.update(checkedData, {
      where: {
        item_id
      }
    });
    res.status(200)
    res.json({
      ok: true,
      msg: 'Item correctly updated'
    })  
  } 
  catch(err) {
    console.log(err)
    if (err instanceof(ZodError)) {
      res.status(400).json({
        ok: false,
        error: 'express-validator errors'
      })
    }
    else if (err.message === 'JWT error') {
      res.status(400).json({ok: false, msg: 'JWT error'});
    }
    else {
      res.status(500).json({
        ok: false,
        error: 'Something failed on server side'
      })
    }
  }
}

module.exports = {
    getObjInventory,
    postObjInventory,
    putInventoryData,
    getObjById,
    deleteObjInventory
}