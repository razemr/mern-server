import { connect } from 'mongoose';
import 'dotenv';
import 'colors';

const db = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI!, {
            autoIndex: process.env.NODE_ENV! === 'production' ? false : true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);

    } catch (err: any) {
        console.log(`Error: ${err.message}`.red);
        process.exit(1);
    }
}

module.exports = db;