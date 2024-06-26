const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role:{
        type:String,
        enum: ['Author','Editor','Reviewer'],
        required: true,
    },
    password: { type: String, required: true },
    experience: {
        Dept:{type: String, required: true},
        Designation:{type: String, required: true},
        College:{type: String, required: true},
        Period:{type: Number, required: true},
    },
    profession: {type: String, required: true},
    email: [{type: String, required: true}],
    area:[{type: String, required: true}],
});

const User = mongoose.model("PRS-User", userSchema);

module.exports = User;
