exports.generateDynamicCommands = function(steps) {
    console.log("generateDynamicCommands");
    console.log(steps);
    var promiseFactories = [];

    for( var i = 0; i < steps.length; i++) {
        var step = steps[i];
        var command = dynamicCommand.bind(this, step);
        promiseFactories.push(command);
    }
    return promiseFactories;
}

function dynamicCommand(step) {
    console.log("dynamicCommand");
    console.log(step);
    if (failure)
        return;

    switch (step.stepType) {
        case "pageLoad":
            return this
                .url(step.url)
                .then(function() {
                        return client.saveScreenshot();
                    }, function(e) {
                        failure = failure !== undefined ? failure : {
                            stepId: step._id,
                            reason: "failed to load url"
                        }
                    })
                .then(function(screenshot) {
                    handleScreenShot(screenshot, step._id);
                })
                .pause(stepDelay);
        case "click":
            return this
                .waitForVisible(step.selector)
                .then(function(){}, function(e) {
                    //didn't find element
                    failure = failure !== undefined
                        ? failure
                        : {
                            stepId: step._id,
                            reason: "failed to find element"
                        }
                })
                .click(step.selector)
                .then(function(){
                    return client.saveScreenshot();
                }, function(e) {
                    //counldn't click element
                    failure = failure !== undefined
                        ? failure
                        : {
                            stepId: step._id,
                            reason: "failed to click element"
                        }
                })
                .then(function(screenshot) {
                    handleScreenShot(screenshot, step._id);
                })
                .pause(stepDelay);
        case "hover":
            return this
                .waitForVisible(step.selector)
                .then(function(){}, function(e) {
                    //didn't find element
                    failure = failure !== undefined
                        ? failure
                        : {
                            stepId: step._id,
                            reason: "failed to find element"
                        }
                })
                .moveToObject(step.selector)
                .then(function(){
                    return client.saveScreenshot();
                }, function(e) {
                    //counldn't click element
                    failure = failure !== undefined
                        ? failure
                        : {
                            stepId: step._id,
                            reason: "failed to hover element"
                        }
                })
                .then(function(screenshot) {
                    handleScreenShot(screenshot, step._id);
                })
                .pause(stepDelay);
        case "input":
            return this
                .waitForVisible(step.selector)
                .then(function(){}, function(e) {
                    failure = failure !== undefined
                        ? failure
                        : {
                            stepId: step._id,
                            reason: "failed to find element"
                        }
                })
                .setValue(step.selector, step.inputValue)
                .then(function(){
                    return client.saveScreenshot();
                }, function(e) {
                    failure = failure !== undefined
                        ? failure
                        : {
                            stepId: step._id,
                            reason: "failed to set value"
                        }
                })
                .then(function(screenshot) {
                    handleScreenShot(screenshot, step._id);
                })
                .pause(stepDelay);

        case "confirmElementExists":
            return this
                .waitForVisible(step.selector)
                .then(function(){
                    return client.saveScreenshot();
                }, function(e) {
                    failure = failure !== undefined
                        ? failure
                        : {
                            stepId: step._id,
                            reason: "failed to find element"
                        }
                })
                .then(function(screenshot) {
                    handleScreenShot(screenshot, step._id);
                })
                .pause(stepDelay);
        }
    }