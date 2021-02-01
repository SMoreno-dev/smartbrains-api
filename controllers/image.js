const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "9506441d3d9040a2bba6f5e6d487f78c"
});

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json('Unable to work with API')
    })
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => {
        res.status(400).json(err + "unable to get count");
    })
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}