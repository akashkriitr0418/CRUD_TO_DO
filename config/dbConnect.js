const mongoose =  require("mongoose");
const url = "mongodb+srv://akmongo_city:akmongocityp@cluster0.ohauo.mongodb.net/delivery?retryWrites=true&w=majority"
async function connect(){
   try{
      await mongoose.connect(url,{
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log("connected");
        
   }catch(err){
      console.log(err);
   }
}
module.exports = connect();