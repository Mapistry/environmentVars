## Environment Variables made easy

This module is helpful if you have environment variables that get loaded in different way, depending on where the code is run.  For example, if your tests run in a place where the environment isn't bootstrapped with all the required variables, but your production code runs in a place that is, this will help you out.

After you configure the module, and call `.get('ENV_VAR_NAME')`, the module first looks in process.env (the environment) to see if the variable is there.  If it's not found there - and assuming you've set this module up to know where a `.env` file is - it will try to load the variable from `.env`

####Example Usage

    // path is node's handy internal module for normalizing filepath
    var path = require('path');

    var filePath = path.join(__dirname, '../../my_project_root');
    var fileName = '.env';

    var envVars = new EnvironmentVars(filePath, fileName);
    var apiKey = envVars.get('SUPER_AWESOME_API_KEY');


Above, the `envVars` variable is configured to search for a file full of environment variables.  An example file would look like this:

    TEST_API_URL=http://localhost:4989
    SUPER_AWESOME_API_KEY=xxxx-yyyy-zzzz

And the name of the file is searches for is, by default, `.env`, so it's not required if your setup is like the example above.

####Performance Considerations
The module will cache the environment variable file after it's read from disk the first time.  If you'd like to force it to re-read from disk, call the `_resetCache` method.

####Contributing
PR's welcome :)