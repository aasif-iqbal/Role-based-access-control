import mongoose from "mongoose";

const db_connection = async (): Promise<typeof mongoose | void> => {
    
    try{
        const localConnectionString = `${process.env.MONGO_URI}`;
        const connection = await mongoose.connect(localConnectionString);            

        console.log('Database connected successfully');
        
        return connection;        
    }catch(err){
        console.error(err);
    }
    
}
export default db_connection;