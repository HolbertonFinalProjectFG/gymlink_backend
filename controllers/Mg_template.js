const { Mg_template } = require('../models/Mg_template'); 

const getRoutinesTemplates = async(req, res) => {
  try {
    const routines = await Mg_template.findAll({
      attributes: ['content'],
    });
    res.status(200).json({ ok: true, data: routines });
  } catch (err) {
    console.log(err);
    res.status(500).json({ok: false, msg: 'An error ocurred on server side'});
  }
}
  
const postMgTemplate = async(req, res) => {
  try{
    const routineTemplate = req.body;  
    const Mg = await Mg_template.create(routineTemplate)
    res.status(200).json({ok:true, data: Mg})
  } catch(err) {
    console.log(err);
    res.status(400).json({ok: false, typeErr: err.message})
  }
}

module.exports = {
  getRoutinesTemplates,
  postMgTemplate,
}