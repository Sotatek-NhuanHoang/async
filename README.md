# Another async package
#### The purpose: Catching any errors insight task and call last callback
For Documentation, visit https://caolan.github.io/async/

##### Example:
```javascript
async.auto({
    get_data: function(callback) {
        console.log(UndefinedVariables) // This line will throw an exception

        callback(null, 'data', 'converted to array');
    },
    make_folder: function(callback) {
        callback(null, 'folder');
    },
    write_file: ['get_data', 'make_folder', function(results, callback) {
        callback(null, 'filename');
    }],
    email_link: ['write_file', function(results, callback) {
        callback(null, {'file':results.write_file, 'email':'user@example.com'});
    }]
}, function(err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
});
```
##### Result:
```javascript
err =  ReferenceError: UndefinedVariables is not defined
    at get_data (/home/nn/workspace/async-catch-error/index.js:6:21)
    at params (/home/nn/workspace/async-catch-error/node_modules/async/internal/wrapAsync.js:24:13)
    at runTask (/home/nn/workspace/async-catch-error/node_modules/async/auto.js:131:13)
    at /home/nn/workspace/async-catch-error/node_modules/async/auto.js:71:13
    at processQueue (/home/nn/workspace/async-catch-error/node_modules/async/auto.js:81:13)
    at Object.exports.default [as auto] (/home/nn/workspace/async-catch-error/node_modules/async/auto.js:67:5)
    at Object.<anonymous> (/home/nn/workspace/async-catch-error/index.js:4:7)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
results = undefined

```
