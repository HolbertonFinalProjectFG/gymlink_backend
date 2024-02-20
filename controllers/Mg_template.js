const { Mg_template } = require('../models/Mg_template');
const { mgSchema } = require('../schemas/Mg_template');
const { ZodError } = require('zod')

const getMgTemplate = async(req, res) => {
  try {
    const routines = await Mg_template.findAll();
    res.status(200).json({ ok: true, data: routines });
  } catch (err) {
    console.log(err);
    res.status(500).json({ok: false, msg: 'An error ocurred on server side'});
  }
}
  
const postMgTemplate = async(req, res) => {
  try{
    const checkedData = mgSchema.safeParse(req.body)
    if (checkedData.success === false) {
      throw new ZodError(checkedData.error)
    }
    const Mg = await Mg_template.create(checkedData.data)
    res.status(200).json({
      ok:true,
      data: Mg
    })
  } catch(err) {
    console.log(err);
    if (err instanceof ZodError) {
      res.status(400).json({
        ok: false,
        msg: 'express-validator errors'
      })
    }
    else {
      res.status(500).json({
        ok: false,
        msg: 'Something failed on server side'
      })
    }
  }
}

const deleteMgTemplate = async(req, res) => {
  try {
    const { mg_template_id } = req.params;
    const mg = await Mg_template.findByPK(mg_template_id);
    if (!mg === null) {
      await mg.destroy();
      res.status(200).json({
        ok: true,
        msg: `Mg_template with id ${mg_template_id} deleted succesfully`
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: `mg_template with id ${mg_template_id} not found`
      });
    }
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Something failed on server side'
    });
  }
}

module.exports = {
  getMgTemplate,
  postMgTemplate,
  deleteMgTemplate,
}