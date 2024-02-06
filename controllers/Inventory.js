const e = require('express');
const sequelize = require('../database/database.js')
const { Inventory } = require('../models/Inventory.js');

const getObjInventory = async(req, res) => {
    try{
      const items = await Inventory.findAll();
      res.status(200).json({ok: true, data: items});
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

module.exports = {
    getObjInventory,
    postObjInventory
}