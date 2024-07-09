import { DATABASE } from "@/config/config";
import { ConnectOptions, connect } from "mongoose";

const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions;

export const createConnection = async () => {
    await connect(DATABASE.URL, options)
}