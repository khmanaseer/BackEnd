============1st step =============
Data association is done by emmbedding the associated data to a data base
it has to be included in the model like comments

var schema = new mongoose.Schema({
Data1:String,
Data2:String,
comments:[            ==============>It's going to be populated using comments
     {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"  
      }
]
});


============2nd step =============
//While Comment has to be verified in another model
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});



============3rd step =============
during Comment create route, Data has to be found then it has to be associated with it
Data.findById(req.params.id, function(err, data){
       if(err){
           console.log(err);
           res.redirect("somewhere");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               data.save();
               res.redirect('somewhere');
           }



============last step =============
//It has to be populated in the data base in order to be used and that is done by using
data.findById(req.params.id).populate("comments").exec(function(err,foundedData){

Thats it!!!
