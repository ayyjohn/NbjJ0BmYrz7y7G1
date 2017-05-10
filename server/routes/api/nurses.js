import Nurse from '../../models/Nurse';

export default (req, res) => {
    Nurse.find().then((nurses) => {
        res.json({
            nurses: nurses,
            success: true,
        });
    }).catch((error) => {
        res.json({
            error,
            success: false
        });
    });
};
