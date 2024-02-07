const e = require('express');
const sequelize = require('../database/database.js')
const { Inventory } = require('../models/Inventory.js');
const { itemUpdateSchema } = require('../schemas/Inventory.js');
const { ZodError } = require('zod');

const getObjInventory = async(req, res) => {
    try{
      const items = await Inventory.findAll();
      res.status(200).json({ok: true, data: items});
    } catch {
      res.status(500).json({ok: false, msg: "An error ocurred on server side"});
    }
  };

const getObjById = async(req, res) => {
  try {
    const { item_id } = req.params;
    const item = await Inventory.findByPk(item_id);
    res.status(200).json({ok: true, data: [ item ]});
  } catch {
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
};


const postObjInventory = async(req, res) => {
    const { item_name, quantity } = req.body;
    let statusFunction = {
        status: 0,
        msgStatus: {}
    };
    try{    
        if (2 === 1) { // Zod autentication
            statusFunction.status = 400;
            statusFunction.msgStatus.ok = false;
            statusFunction.msgStatus.error = 'express-validator errors';
            res.status(statusFunction.status).json(statusFunction.msgStatus);        
        }
    await Inventory.create(item_name, quantity);
    } catch(err) {
        statusFunction.status = 500;
        statusFunction.msgStatus.ok = false;
        statusFunction.msgStatus.msg = err;
    res.status(statusFunction.status).json(statusFunction.msgStatus);
    }
    statusFunction.status = 200;
    statusFunction.msgStatus.ok = true;
    statusFunction.msgStatus.msg = 'Object inventory correctly added';
  
    res.status(statusFunction.status).json(statusFunction.msgStatus);
}

const putInventoryData = async (req, res) => {
  try {
    const { item_id } = req.params
    const checkedData = itemUpdateSchema.parse(req.body)
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
    await User.update(checkedData, {
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
      if (err instanceof(ZodError)) {
        res.status(400).json({
          ok: false,
          error: 'express-validator errors'
        })
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
    getObjById
}
