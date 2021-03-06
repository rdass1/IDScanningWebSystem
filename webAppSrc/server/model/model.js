const mongoose = require('mongoose');


// var schema = new mongoose.Schema({
//     id:{
//         type: String,
//         required: true
//     },
//     firstName:{
//         type: String,
//         required: true
//     },
//     lastName:{
//         type: String,
//         required: true
//     },
//     status:{
//         type: String,
//         required: true
//     }
// });

const notesObj = {
    _id: false,
    madeBy: String,
    date: {
        type: Date,
        default: Date
    },
    message: String
};

const userClassObjID = {
    type: mongoose.ObjectId,
    unique: true
}


const userSchema = new mongoose.Schema({
    cardID: {
        type: String,
        index: true,
         unique: true
    },
    cardIDData : {
        ISS : {
            type:Date,
            default:Date
        },
        heightFT: Number,
        heightIN: Number,
        eyeColor: String,
        hairColor: String,
    },
    MRNum: String,
    role : String,
    firstName: String,
    middleName: String,
    lastName: String,
    DOB: Date,
    gender: String,
    pronoun: String,
    regDate: {
        type: Date
    },
    address: {
        street: String,
        aptSuite: String,
        city: String,
        state: String,
        zipCode: Number
    },
    email: String,
    phone: Number,
    notes: String,
    status: {
        active: Boolean,
        flag: Boolean,
        updatedAt: Date,
        locationObjID: {
            type:mongoose.ObjectId,
        },
        buildingObjID: {
            type:mongoose.ObjectId,
        }
    }

},{ collection : 'memberInfo'});

const logsObj = {
    date: {
        type: Date,
        default: Date.now
    },
    locationObjID: {
        type:mongoose.ObjectId,
    },
    buildingObjID: {
        type:mongoose.ObjectId,
    },
    timeIn: Date,
    timeOut: Date,
    hours: Number,

};

const facilityUsageSchema = new mongoose.Schema({
    userObjID: mongoose.ObjectId,
    date: {
        type: String,
    },
    locationObjID: {
        type:mongoose.ObjectId,
    },
    buildingObjID: {
        type:mongoose.ObjectId,
    },
    locationBuilding: String,
    timeIn: Date,
    timeOut: Date,
    hours: Number,
},{ collection : 'facilityUsage' });

const locationsSchema = new mongoose.Schema({
    buildingObjID: mongoose.ObjectId,
    name: String,
    roomNumber: String,
    floorNumber: String
},{ collection : 'locations' });

const buildingsSchema = new mongoose.Schema({
    name: String,
    company: String,
    address: {
        street: String,
        aptSuite: String,
        city: String,
        state: String,
        zipCode: Number
    }, 
},{ collection : 'buildings'});

const classesSchema = new mongoose.Schema({
    name: String,
    teacher: String,
    subject: String,
    locationObjID: String,
    buildingObjID: String,
    startTime: String,
    endTime: String
},{ collection : 'classes'});

const userClassesSchema = new mongoose.Schema({
    userObjID: mongoose.ObjectId,
    classObjID: mongoose.ObjectId

},{collection: 'memberClasses'});

const employeeLoginSchema = new mongoose.Schema({
    userObjID: mongoose.ObjectId,
    username: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    role: String,
},{collection:"employeeLogin"});


var schema = new mongoose.Schema({
    cardID: String,
    firstName: String,
    lastName: String,
    address: Map,
    active: Boolean,

}, 
    { collection : 'memberInfo' });   // collection name
//const userDB = mongoose.model('memberInfo', new mongoose.Schema({}));

//Creating Indexes
facilityUsageSchema.index({locationBuilding:"text",date:'text'});
userSchema.index({firstName:"text",lastName:"text",MRNum:"text",cardID:"text"})




const userDB = mongoose.model('', schema);
const userDB2 = mongoose.model('member',userSchema);
const facilityUsageDB = mongoose.model('facilityUsage',facilityUsageSchema);
const locationsDB = mongoose.model('locations',locationsSchema);
const buildingsDB = mongoose.model('buildings',buildingsSchema);
const classesDB = mongoose.model('classes',classesSchema);
const userClassesDB = mongoose.model('memberClasses',userClassesSchema);
const employeeLoginDB = mongoose.model('employeeLogin',employeeLoginSchema);
// ,facilityUsageDB,locationsDB,buildingsDB,classesDB
// exports.userDB2= userDB2;

const defaultAdmin = new employeeLoginDB({username:"admin",password:"$2b$10$PyZ/8e0wZgSjwQ7hLNNAe.mwlsPqAz2Rr7Ef2EHFBh6PkUG3qosG6",role:"Admin"});
defaultAdmin.save(defaultAdmin)
.then(data =>{
    console.log('Creating default admin login');
})
.catch(err=>{
    
});





exports.userDB = userDB2;
exports.facilityUsageDB = facilityUsageDB;
exports.locationsDB = locationsDB;
exports.buildingsDB = buildingsDB;
exports.classesDB = classesDB;
exports.userClassesDB = userClassesDB;
exports.employeeLoginDB = employeeLoginDB;

// $replaceRoot: { newRoot: { $mergeObjects: [ "$locations", "$$ROOT" ] } }

// {
//     $replaceRoot: { 
//         newRoot: { 
//             $mergeObjects: ["$$ROOT","$locations"]
//         }
//     }
// }



