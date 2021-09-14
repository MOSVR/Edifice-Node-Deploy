const config = require("./../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.employee= require("./employee.model.js")(sequelize, Sequelize);

// Project Component Model Classes
db.projects = require("./project.model.js")(sequelize, Sequelize);
db.departments = require("./department.model.js")(sequelize, Sequelize);
db.milestones = require("./milestone.model.js")(sequelize, Sequelize);
db.portfolioprogress = require("./portfolioprogress.model.js")(sequelize, Sequelize);
db.projectuser = require("./projectuser.model")(sequelize, Sequelize);
// Drawing Component Model Classes
db.drawingcategory = require("./drawing-category.model")(sequelize, Sequelize);
db.drawings = require("./drawing.model.js")(sequelize, Sequelize);
db.drawrevision = require("./drawrevision.model")(sequelize,Sequelize);
// Bidding Component Model Classes
db.biddings = require("./bidding.model")(sequelize, Sequelize);
// Photo component Model Classes
db.album = require("./photo-album.model")(sequelize, Sequelize);
db.photo = require("./photo.model.js")(sequelize, Sequelize);
// Document component Model Classes
db.directory = require("./directory.model")(sequelize, Sequelize);
db.document = require("./document.model")(sequelize, Sequelize);
// Meeting component Model Classes
db.meetings = require("./project-management/meeting.model")(sequelize, Sequelize);
db.meetingcategory = require("./project-management/meetingcategory.model")(sequelize, Sequelize);
// Punch list component Model Classes
db.punchlist = require("./project-management/punchlist.model")(sequelize, Sequelize);
db.punchlisttypes = require("./project-management/punchlisttypes.model")(sequelize, Sequelize);
db.punchlist = require("./project-management/punchlist.model")(sequelize, Sequelize);
// Action Plan Model Classes
db.actionplantype = require("./project-management/actionplantype.model")(sequelize, Sequelize);
db.actionplan = require("./project-management/actionplan.model")(sequelize, Sequelize);
db.actionplansection = require("./project-management/actionplansection.model")(sequelize, Sequelize);
db.actionplanitem = require("./project-management/actionplanitem.model")(sequelize, Sequelize);

// Finance Model Classes
db.budgets = require("./budget.model.js")(sequelize, Sequelize);
db.directcosts = require("./directcost.model.js")(sequelize, Sequelize);
db.commitments = require("./commitment.model.js")(sequelize, Sequelize);
db.sovs = require("./sov.model.js")(sequelize, Sequelize);
db.primecontracts = require("./primecontract.model.js")(sequelize, Sequelize);
db.invoices = require("./invoice.model.js")(sequelize, Sequelize);
db.payments = require("./payment.model.js")(sequelize, Sequelize);

// Resource management
db.equipments = require("./equipment.model")(sequelize, Sequelize);
db.categorys = require("./equipment-category.model")(sequelize, Sequelize);
db.crews = require("./crew.model")(sequelize, Sequelize);
db.workers = require("./worker.model")(sequelize, Sequelize);
db.timesheets = require("./timesheet.model")(sequelize, Sequelize);
db.workedHours = require("./worked-hours.model")(sequelize, Sequelize);
db.schedule = require("./schedule.model")(sequelize, Sequelize);

//for core class vendors and employees
db.vendor=require("./vendor.model")(sequelize, Sequelize);
db.employee=require("./employee.model")(sequelize, Sequelize);

//This section is for testing purposes
db.demo = require("./demo.model")(sequelize, Sequelize);
db.demo1 = require("./demo1.model")(sequelize, Sequelize);
db.demo2 = require("./demo2.model")(sequelize, Sequelize);

db.demo1.hasOne(db.demo2,{as: "demo2"});
db.demo2.belongsTo(db.demo1,{
  foreignKey: "demo1Id",
  as: "demo1"
})

//db.employee.hasOne(db.users,{as: "users"});
//db.users.belongsTo(db.employee,{
//  foreignKey: "username",
//  as: "username"
//})
//Testing section ends

// ----------- Project Management Starts -------------
// One project has many departments
db.projects.hasMany(db.departments, { as: "departments" });
db.departments.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});
// One project has many milestones
db.projects.hasMany(db.milestones, { as: "milestones" });
db.milestones.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

db.projects.hasMany(db.portfolioprogress, { as: "progress" });
db.portfolioprogress.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One project has many project users as staff members
db.projects.hasMany(db.projectuser, { as: "projectusers" });
db.projectuser.belongsTo(db.projects, {
  through: "projectId",
  as: "project",
});

// One project has many drawing categories & one category has only one project
db.projects.hasMany(db.drawings, { as: "drawingcategory" });
db.drawingcategory.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One project has many drawings 
db.projects.hasMany(db.drawings, { as: "drawings" });
db.drawings.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One drawing has many revision comments add by the users
db.drawings.hasMany(db.drawrevision,{as: "drawrevisions"});
db.drawrevision.belongsTo(db.drawings,{
  foreignKey: "drawingId",
  as: "drawing",
});

// One project has many albums
db.projects.hasMany(db.album,{as: "albums"});
db.album.belongsTo(db.projects,{
  foreignKey: "projectId",
  as: "project",
});

// One project has many photos
db.projects.hasMany(db.photo,{as: "photos"});
db.photo.belongsTo(db.projects,{
  foreignKey: "projectId",
  as: "project",
});

// One project can has many directories
db.projects.hasMany(db.directory,{as: "directory"});
db.directory.belongsTo(db.projects,{
  foreignKey: "projectId",
  as: "project",
});

// One directory has many documents
db.projects.hasMany(db.document, { as: "documents" });
db.document.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

//One project has many biddings
db.projects.hasMany(db.biddings, { as: "biddings" });
db.biddings.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

//
db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

//
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});



// ---------------------------------------------------

//One project has many meetings
db.projects.hasMany(db.meetings, { as: "meetings" });
db.meetings.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

//One project has many meeting categories
db.projects.hasMany(db.meetingcategory, { as: "meetingcategory" });
db.meetingcategory.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One meeting category has many meetings
db.meetingcategory.hasMany(db.meetings, { as: "meetings" });
db.meetings.belongsTo(db.meetingcategory, {
  foreignKey: "mcId",
  as: "mcategory",
});

// One project has many punch lists
db.projects.hasMany(db.punchlist, { as: "punchlist" });
db.punchlist.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One project has many punch lists types
db.projects.hasMany(db.punchlisttypes, { as: "punchlisttypes" });
db.punchlisttypes.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

//One punch list type has many punch list items
// db.punchlist.hasMany(db.punchlisttypes, { as: "pltypeitems" });
// db.punchlisttypes.belongsTo(db.punchlist, {
//   foreignKey: "punchlisttypesId",
//   as: "type",
// });

// One project has many action plans
db.projects.hasMany(db.actionplan, {as: "actionplans"});
db.actionplan.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One actionplan has many action sections
db.actionplan.hasMany(db.actionplansection, {as: "actionplansection"});
db.actionplansection.belongsTo(db.actionplan, {
  foreignKey: "actionplanId",
  as: "actionplan",
});

// One actionplan section has many action plan items
db.actionplansection.hasMany(db.actionplanitem, {as: "actionplanitems"});
db.actionplanitem.belongsTo(db.actionplansection, {
  foreignKey: "actionplansectionId",
  as: "actionplansection",
});

// ----------- Project Management Ends -------------

// ----------- Finance Management Starts -----------
// One project has many direct cost
db.projects.hasMany(db.directcosts, { as: "directcosts" });
db.directcosts.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One project has many budgets
db.projects.hasMany(db.budgets, { as: "budgets" });
db.budgets.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One project has many commitments
db.projects.hasMany(db.commitments, { as: "commitments" });
db.commitments.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One commitment has many sovs
db.commitments.hasMany(db.sovs, { as: "sovs" });
db.sovs.belongsTo(db.commitments, {
  foreignKey: "commitmentId",
  as: "commitment",
});

// One projects has many sovs
db.projects.hasMany(db.sovs, { as: "sovs" });
db.sovs.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

// One commitment has many 
db.commitments.hasMany(db.payments, { as: "payments" });
db.payments.belongsTo(db.commitments, {
  foreignKey: "commitmentId",
  as: "commitment",
});



// One commitment has many invoices
db.commitments.hasMany(db.invoices, { as: "invoices" });
db.invoices.belongsTo(db.commitments, {
  foreignKey: "commitmentId",
  as: "commitment",
});
// ----------- Finance Management Ends -----------

// ----------- Resource Management Starts --------
//One project has many equipments
db.projects.hasMany(db.equipments, { as: "equipments" });
db.equipments.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});


//One crew has many workers
db.crews.hasMany(db.workers, { as: "workers" });
db.workers.belongsTo(db.crews, {
  foreignKey: "crewId",
  as: "crew",
});

//One user has many schedules
db.users.hasMany(db.schedule, { as: "schedule" });
db.schedule.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

//One project has many crews
db.projects.hasMany(db.crews, { as: "crews" });
db.crews.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

//One project has many timesheets
db.projects.hasMany(db.timesheets, { as: "timesheets" });
db.timesheets.belongsTo(db.projects, {
  foreignKey: "projectId",
  as: "project",
});

//One worker has many workerhours
db.workers.hasMany(db.workedHours, { as: "workersHours" });
db.workedHours.belongsTo(db.workers, {
  foreignKey: "workerWId",
  as: "worker",
});

//One timesheet has many workerhours
db.timesheets.hasMany(db.workedHours, { as: "workedhourstimesheet" });
db.workedHours.belongsTo(db.timesheets, {
  foreignKey: "timesheetCode",
  as: "timesheet",
});




// ----------- Resource Management Ends --------

//Role description 
//admin - edifice admin
// moderator - manager level
// user - enginner level
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;