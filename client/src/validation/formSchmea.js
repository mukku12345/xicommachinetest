import * as Yup from 'yup';

const formSchema = Yup.object().shape({

    fName:Yup.string().required('first name is required'),
    lName:Yup.string().required('first name is required'),
    email:Yup.string().required('email is required').matches(/^(?!.*@[^,]*,)/),
    dob: Yup.string().required('Date of birth is required').test('is-adult', 'Age must be 18 or older', function(value) {
        if (!value) return false;

        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age >= 18; 
        }

        return age >= 18; 
    }),
    rStreet1:Yup.string().required('required'),
    rStreet2:Yup.string().required('required'),
    residenceAddPermanent: Yup.boolean(),
    pStreet1: Yup.string().when('residenceAddPermanent', {
        is: false,
        then: Yup.string().required('Permanent street 1 is required'),
        otherwise: Yup.string().notRequired() 
    }),
    pStreet2: Yup.string().when('residenceAddPermanent', {
        is: false,
        then: Yup.string().required('Permanent street 2 is required'),
        otherwise: Yup.string().notRequired() 
    }),
    fileName:Yup.string().required('required'),
    fileType:Yup.string().required('required'),
    file:Yup.string().required('required'),

})


export default formSchema;                      