import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import  routes from './src/routes/crmRoutes';
import  messenger from './src/controllers/createMessage';
import {Settings} from './settings';

const app = express();

let messages= new messenger(Settings.PORT);
// mongoose connection
//mongoose.Promise = global.Promise;

const dataConnection= (user:string, pass:string): string=>{

 return `mongodb://${user}:${pass}`
}
let database=dataConnection(Settings.mlabUser,Settings.mlabPass)
mongoose.connect(database, {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
res.send(messages.messagePrint())
   // res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(Settings.PORT, () =>
    console.log(messages.messagePrint())
    //console.log(`your server is running on port ${PORT}`)
);