const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  //   addStep,
  update,
  remove
};

//tested and working
function find() {
  return db("schemes");
}

//tested and working
function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

//tested and working
function findSteps(id) {
  return db("schemes as s")
    .join("steps as t", "s.id", "t.scheme_id")
    .where("s.id", id)
    .select(
      "s.id",
      "t.scheme_id as scheme_name",
      "t.step_number",
      "t.instructions"
    );
}

//tested and working
function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => {
      return findById(id);
    });
}

// function addStep(stepData, id) {
//   return db("steps as t")
//     .join("schemes as s", "s.id", "t.scheme_id")
//     .where("s.id", id)
//     .insert(stepData, "t.scheme_id");
// }

//tested, working but not returning the edited object
function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

//tested and working
function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}
