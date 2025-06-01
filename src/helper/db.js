<<<<<<< HEAD
// import mongoose from "mongoose"
// export const connectDb = async () => {
//     try {
//         await mongoose.connect(process.env.MONOGO_DB_URL, {
//             dbName: 'FinanceManagement',
//         });
//         console.log("DB Connected...");
//     } catch (error) {
//         console.log('Failed To Connect With DataBase')
//         console.log(error)
//     }
// }
=======
import mongoose from "mongoose"
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONOGO_DB_URL, {
            dbName: 'FinanceManagement',
        });
        console.log("DB Connected...");
    } catch (error) {
        console.log('Failed To Connect With DataBase')
        console.log(error)
    }
}
>>>>>>> 80b69a8aef87a0fc8697f8b4f0e9b9241f3ac29e



