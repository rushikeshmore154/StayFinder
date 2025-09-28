const mongoose=require('mongoose');
const Listing = require('../models/Listing');
const initData=require('./data.js');
// const Listing = require('../models/Listing');

const mongo_url='mongodb://127.0.0.1:27017/wander_lust'

main().then(()=>{
    console.log("mongodb connection is successfull");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initData.data=initData.data.map((obj)=>({...obj,owner:"68950512e164f2d1eb949ce5"}));
        await Listing.insertMany(initData.data, { ordered: false });

        console.log("data was initialized");
    } catch (error) {
        console.error("Error initializing data:", error);
    }
};

initDB();