import { createConnection } from 'typeorm';

export const connectToDatabase = async () => {
    try {
        const conn = await createConnection();
        console.log('Connected to PostgresSQL Database Server !');
    } catch (error) { console.error(error); }
};
