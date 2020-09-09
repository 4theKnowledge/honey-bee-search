// Import npm packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const path = require('path');


// Body parser iddleware
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;


mongoose.Promise = global.Promise;
// Make connection to mongodb (atlas)
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Serve static assets (build folder) if we're in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // Load index.html unless hitting routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;



mongoose.connection.on('connected', () => {
    console.log('Mongoose has connected succesfully!');
}); // event listener for connection event.


// Define mongo schema
const Schema = mongoose.Schema;
const GeneSeqSchema = new Schema({
    seq_name: String,
    seq: String
    }
);

// Define and register model
const GeneSeq = mongoose.model('gene-seq-info', GeneSeqSchema);

// saving data to our database
// const data = {
//     seq_name: 'Sequence A',
//     seq: 'aaabbbcccxyz'
// };

// const newGeneSeq = new GeneSeq(data);   // instance of the model

// newGeneSeq.save((error) => {
//     if (error) {
//         console.log('Something went wrong when saving data');
//     } else {
//         console.log('Data saved succesfully!');
//     }
// });


// HTTP request logger
// Morgan isnt required for MERN but it's a request logger that can
// be used for debugging... logs requests in terminal.
app.use(morgan('tiny'));

//Routes
app.get('/api', (req, res) => {

    // // Get all documents that have aa in their sequence
    // GeneSeq.find({"seq": {$regex: ".*aa.*"}})
    // .then((data) => {
    //     console.log('Data: ', data)
    //     res.json(data);
    // })
    // .catch((error) => {
    //     console.log('Error: ', error);
    // });

    res.json({
        msg: "get request rec."
    })

});


app.post('/api/singlesearchresult', (req, res) => {

    GeneSeq.find({"sequence": {$regex: ".*"+req.body.seq+".*"}}, {'_id': 0, 'name': 1, 'description': 1})   // doesnt return _id
        .exec()
        .then((data) => {
            console.log(data)
            res.json(data);
        })
        .catch((error) => {
            console.log(error)
        });

})


app.post('/api/searchresults', (req, res) => {
    
    // TODO: uppercase with .toUpperCase()

    function seqMatch(sequence) {
        const promise = GeneSeq.find({"sequence": {$regex: ".*"+sequence+".*"}}, {'_id': 0, 'name': 1, 'sequence': 1, 'description': 1})   // doesnt return _id
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error)
        });
        return promise;
    };
    
    const pattern = RegExp('^[A-Z\,]*$');
    // Check if string formatted correctly
    if (!pattern.test(req.body.seqs)) {
        res.json('Incorrectly formatted input - please try again')
    }
        
    // Split on delimiter and build search results array
    const sequenceList = req.body.seqs.split(",");

    // Compile search results
    let promises = sequenceList.map(sequence => seqMatch(sequence));
    Promise.all(promises)
    .then((resultSet) => {
        const data = resultSet.map((results, index) => {
            const sequence = sequenceList[index];
            const matches = results.length;
            const matchedResults = [];
            results.map((result) => {
                matchedResults.push(result);
            })
            return {"sequence": sequence, 'matches': matches, 'names': matchedResults}
        })
        res.json(data);
    })
    .catch((error) => {
        return(error)
    })
})


app.post('/api/getseq', (req, res) => {


    GeneSeq.find({"sequence": {$regex: ".*"+req.body.seq+".*"}}, {'_id': 0})   // doesnt return _id
    .then((data) => {
        console.log('Data: ', data)
        res.json(data);
    })
    .catch((error) => {
        console.log('Error: ', error);
    });

});


app.listen(PORT, console.log(`Server started on ${PORT}`));