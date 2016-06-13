// set up ======================================================================
var express 		= require('express'),
    fs 				= require('fs'),
    path			= require('path'),
    cluster         = require('cluster'),
    cpu             = require('os').cpus().length,
    Util            = require('./app/helpers/appUtils');

// configuration ===============================================================
// Set the node environment variable if not set before
var default_config = 'development';
process.argv.forEach(function(val, index, array) {
    // -- Load
    if(index == 2){
        default_config = val;
    }
});
process.env.NODE_ENV = process.env.NODE_ENV || default_config;

// Initializing system variables
var config = require('./config/config');
global.config = config; //-- Create a global variable to stock all config information


if ( cluster.isMaster )
{
    // === MASTER === //
    global.pid = 'M';
    Util.info('CLUSTER: Master process started.');

    // Spawn Workers
    var workerTimeouts = [];

    for (var i=0; i < cpu; i++)
    {
        cluster.fork();
    }

    // Add worker message listeners
    Object.keys(cluster.workers).forEach(function(id)
    {
        cluster.workers[id].on('message', workerMessage);
    });

    // Wait 5 seconds for worker to start up before checking
    cluster.on('fork', function(worker)
    {
        workerTimeouts[worker.id] = setTimeout(clusterError, 5000);
    });

    cluster.on('listening', function(worker, address)
    {
        Util.info('CLUSTER: Worker is now connected to ' + address.address + ':' + address.port);
        clearTimeout(workerTimeouts[worker.id]);
    });

    cluster.on('exit', function(worker, code, signal)
    {
        var message = 'CLUSTER: Worker ' + worker.id + ' exited (code=' + code + ' sig=' + signal +' suicide=' + worker.suicide + ')';
        Util.error(message);
        clearTimeout(workerTimeouts[worker.id]);

        if ( !worker.suicide )
        {
            Util.info('CLUSTER: Respawning Worker...');
            cluster.fork();
        }
    });

    function clusterError()
    {
        Util.error('CLUSTER: Worker did not start. Something must be wrong.');
    }

    function workerMessage(msgObj)
    {
        if ( msgObj.cmd == 'SHUTDOWN' )
        {
            // Remote Shutdown - Kill Workers
            Util.info('CLUSTER: Shutting down...');

            Object.keys(cluster.workers).forEach(function(id)
            {
                cluster.workers[id].kill();
            });
        }
        else
        {
            Util.error('CLUSTER: Worker Message - cmd=' + msgObj.cmd + ' INVALID COMMAND');
        }
    }
}else{


    var http = require('http');


    // Set the Process Id global
    global.pid = cluster.worker.id;

    // --- LOG
    Util.info('Starting Worker Thread ' + global.pid);

    // Bootstrap models ==> Load all model present
    var models_path = __dirname + '/app/models/';
    var walk = function(path) {
        fs.readdirSync(path).forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);
            if (stat.isFile()) {
                if (/(.*)\.(js$|coffee$)/.test(file)) {
                    require(newPath);
                }
            } else if (stat.isDirectory()) {
                walk(newPath);
            }
        });
    };
    walk(models_path);

    //----- Database connection
    var database = false;

    if(config.db.module == 'mongoDB'){
        var mongoose		= require('mongoose');
        database = mongoose.connect(config.db.link);
    }



    // Express settings
    var app = express();
    require('./config/express')(app,database);


    var router = express.Router();

    // Bootstrap routes  ==> Load all route present
    var routes_path = __dirname + '/app/routes';
    var walk = function(path) {
        fs.readdirSync(path).forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);
            if (stat.isFile()) {
                if (/(.*)\.(js$|coffee$)/.test(file)) {
                    require(newPath)(router);
                }
            }
        });
    };
    walk(routes_path);


    process.on('uncaughtException', function(err)
    {
        Util.error('Caught exception: ' + err);
        //var stack = new Error().stack
        Util.error(err.stack);

        // Really need to gracefully disconnect and kill the worker here
        // Use Domains structure
        process.exit(1);
    });



    app.use('/',router);

    // Manage 404 Route
    app.use(function(req, res) {
        // Error page
        res.status(404).json({ message : 'not found' });
    });


    // Start the app by listening on <port>
    var port = process.env.PORT || config.port;


    http.createServer(app).listen(port);
    Util.info('HTTP server started on port ' + port);

}

