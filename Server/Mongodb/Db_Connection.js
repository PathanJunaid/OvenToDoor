
import mongoose from 'mongoose'
export const Db_Connection = async () => {
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "PizzaStore",

    }).then(() => {
        console.log("Connected");
    }).catch((e) => {
        console.log("failed to connect")
    })
}