import mongoose, { connection } from "mongoose";

const DB_NAME:string = ``;

const db_connection = async (): Promise<typeof mongoose | void> => {
    
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI as string);

        console.log('Database connected successfully');
        return connection;
        
    }catch(err){
        console.error(err);
    }
    
}
export default db_connection;