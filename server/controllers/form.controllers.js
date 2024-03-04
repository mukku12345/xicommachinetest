const db = require('../models');
const Form = db.form.Form;

exports.submitForm = async (req, res) => {
    try {
        const { firstName, lastName, email, dob, residentialAddress, permanentAddress} = req.body;

        const { rStreet1, rStreet2 } = residentialAddress;

        const { pStreet1, pStreet2 } = permanentAddress;


        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            return res.status(400).json({ message: 'Age must be 18 or older.' });
        }



        let documents = [];
        if (req.files && req.files.length > 0) {
            documents = req.files.map(file => ({
                filename: file.originalname,
                fileType: file.mimetype.split('/')[1] 
            }));
        }

        const formData = new Form({
            firstName,
            lastName,
            email,
            dob,
            residentialAddress: { rStreet1, rStreet2 },
            permanentAddress: { pStreet1, pStreet2 },
            documents: documents
        });

        await formData.save();

        res.status(200).json({
            data: formData
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Some error occurred while creating the form data.'
        });
    }
};
