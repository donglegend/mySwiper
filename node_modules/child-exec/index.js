var e = require("child_process").exec;

module.exports = exec;

function exec(command) {
  var child = e(command, function(err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
    console.log(stderr);
  });

  child.stdout.on('data', function(data) {
    console.log(data);
  });

  child.stderr.on('data', function(data) {
    console.log(data);
  });
};