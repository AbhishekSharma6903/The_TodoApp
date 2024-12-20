import {app} from "./app.js";
import {connectDB} from './data/database.js';


connectDB();
console.log(process.env.PORT);


app.listen(4000, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });

