const handleProfile = (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id: id})
    .then(user => {
        if(user.length) {
            return res.json(user[0]);
        } else {
            return res.status(400).json("User not found");
        }

    })
    .catch(err => {
        res.status(400).json(err, "User not found");
    })
}

module.exports = {
    handleProfile: handleProfile
}