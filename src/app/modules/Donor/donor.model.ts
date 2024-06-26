import { Schema, model } from 'mongoose';
import { BloodGroup, Gender } from './donor.constant';
import { DonorModel, TDonor, TUserName } from './donor.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const donorSchema = new Schema<TDonor, DonorModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
  
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    age: {
      type: Number,
      required: [true, 'Email is required'],
    }, 
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      
    },
    bloogGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    address: { 
      
      type: Schema.Types.Mixed,
      required: false,
    },
    
    profileImg: { type: String, default: '' },
    availability :{
      type: Boolean,
      default: true,
    },
    wantToDonateBlood :{
      type: Boolean,
      default: false,
      

    },
    
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name


// filter out deleted documents
donorSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

donorSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

donorSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
donorSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Donor.findOne({ id });
  return existingUser;
};

export const Donor = model<TDonor, DonorModel>('Donor', donorSchema);
