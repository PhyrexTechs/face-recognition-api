const Clerifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '46e6f7f5c4d64988812b172d16d16b94'
   });

const handleApiCall = (req, res) =>{
    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input
        )
        .then(data => {
            res.json(data);
        })
   }


const handleImage = (db) => (req, res) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}