const mongoose = require("mongoose");

const residentialAddressSchema = new mongoose.Schema({
  rStreet1: {
    type: String,
    required: true,
    trim: true,
  },
  rStreet2: {
    type: String,
    required: true,
     trim: true,
  }
});


const permanentAddressSchema = new mongoose.Schema({
    pStreet1: {
      type: String,
      trim: true,
    },
    pStreet2: {
      type: String,
       trim: true,
    }
  });

  const documentsSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        trim: true,
      },
      fileType: {
        type: String,
        enum: ['png', 'jpg','jpeg' ,'pdf', 'img'],
        required: true,
      }
  });


  module.exports = (mongoose) => {
const formSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  }, 
  dob: {
    type: Date,
    required: true,
  },
  residentialAddress: {
    type: residentialAddressSchema,
    required: true,
  },
  permanentAddress: {
    type: permanentAddressSchema,
    required: true,
  },

  documents: {
    type:[documentsSchema] ,
    required: true,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});
const Form = mongoose.model("Form", formSchema);

return { Form };
};


