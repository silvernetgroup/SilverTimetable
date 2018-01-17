const exec = require('child_process').exec;
const voice = 'Agnes'; 
const message = 'done';
//const doneSound = `say -v ${voice} "${message}"`; // MacOS.
const doneSound = `echo ${message} | cscript \"C:\\Program Files\\Jampal\\ptts.vbs\"`;  // windows.

function AnnouncerPlugin(options) {
   // customize.
}

AnnouncerPlugin.prototype.apply = (compiler) => {
    compiler.plugin('done', () => {
        exec(doneSound);
    });
};
module.exports = AnnouncerPlugin;