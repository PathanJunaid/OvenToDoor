
import mongoose from 'mongoose'
export const Db_Connection = async () => {
    await mongoose.connect(process.env.mongo_db_URL, {
        dbName: "PizzaStore",

    }).then(() => {
        console.log("Connected");
    }).catch((e) => {
        console.log("failed to connect")
    })
}