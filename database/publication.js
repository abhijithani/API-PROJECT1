const mongoose = require ("mongoose");

const PublicationSchema = mongoose.Schema(
     {
        id: Number,
        name: String,
        books: [String]
    }
);

const PublicatioModel =  mongoose.model("publication", PublicationSchema);


module.exports = PublicatioModel;