const Department = require('../db/models/department-schema');

module.exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.find();
    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
module.exports.getIdDepartment = async (req, res) => {
  const { id } = req.params;
  const department = await Department.findById({ _id: id });
  res.status(200).json(department);
};
module.exports.postDepartment = async (req, res) => {
  try {
    const { body } = req;
    const department = await Department.create(body);
    res.status(202).json({ message: 'department created' });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
module.exports.patchDepartment = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const dbResponse = await Department.findByIdAndUpdate(id, body);
  res.status(202).json({ message: 'Department updation succesfully' });
};
module.exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  const dbResponse = await Department.findByIdAndDelete(id);
  res.status(202).json({ message: 'Department deletion succesfully' });
};
