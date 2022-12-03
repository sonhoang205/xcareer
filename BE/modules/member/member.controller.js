const MemberModel = require('./member');

const addMember = async (req, res) => {
    try {
        const senderUser = req.user
        const {
            userId,
            projectId
        } = req.body;

        const newMember = await MemberModel.create({
            userId,
            projectId
        });

        res.send({ success: 1, data: newMember });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const kickMember = async (req, res) => {
    try {
        const { userId, projectId } = req.query;

        const kickMember = await MemberModel
            .deleteOne({'userId': userId, 'projectId': projectId})

        res.send({ success: 1 });
    } catch (error) {
        res.status(400).send({ success: 0, message: error.message });
    }
}


module.exports = { addMember, kickMember }