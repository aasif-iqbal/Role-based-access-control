import mongoose from "mongoose";

let connection: typeof mongoose | null = null;

const db_connection = async (): Promise<typeof mongoose | void> => {
    if (connection) {
        console.log('Reusing existing database connection');
        return connection;
    }

    try {
        const localConnectionString = `${process.env.MONGO_URI}`;
        connection = await mongoose.connect(localConnectionString);

        console.log('Database connected successfully');
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err; // Rethrow error for better error handling
    }
};

export default db_connection;
