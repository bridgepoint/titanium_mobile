/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2018 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * This script is loaded on app startup on all platforms. It is used to do the following:
 * - Provide consistent startup behavior between platforms, such as logging Titanium version.
 * - Load Titanium's core JavaScript extensions shared by all platforms.
 * - Provide "*.bootstrap.js" script support. (Similar to native module onAppCreate()/load() support.)
 * - Load the app developer's main "app.js" script after doing all of the above.
 */

// Log the app name, app version, and Titanium version on startup.
Ti.API.info(Ti.App.name + ' ' + Ti.App.version + ' (Powered by Titanium ' + Ti.version + '.' + Ti.buildHash + ')');

// Attempt to load crash analytics module.
// NOTE: This should be the first module that loads on startup.
try {
	require('com.appcelerator.aca');
} catch (e) {
	// Could not load module, silently ignore exception.
}

// Load JS language polyfills
import '@babel/polyfill';

// Load all JavaScript extensions.
import './ti.internal/extensions/Error';
import './ti.internal/extensions/process';

// When registering a binding, need to resolve the path *now* versus whenever the call actually gets made
// i.e. we want absolute paths
const addBinding = require('./ti.internal/extensions/binding');
// FIXME Use require.resolve to resolve the path, once we support it!
addBinding('path', '/ti.internal/extensions/path');
addBinding('os', '/ti.internal/extensions/os');
addBinding('tty', '/ti.internal/extensions/tty');
addBinding('util', '/ti.internal/extensions/util');
addBinding('assert', '/ti.internal/extensions/assert');

// Load and execute all "*.bootstrap.js" files.
// Note: This must be done after loading extensions since bootstraps might depend on them.
require('./ti.internal/bootstrap.loader').loadAsync(function () {
	// We've finished loading/executing all bootstrap scripts.
	// We can now proceed to run the main "app.js" script.
	require('./app');

	// This event is to be fired after "app.js" execution. Reasons:
	// - Allow system to queue startup related events until "app.js" has had a chance to add listeners.
	// - For Alloy apps, we now know that Alloy has been initialized and its globals were added.
	Ti.App.fireEvent('started');
});
