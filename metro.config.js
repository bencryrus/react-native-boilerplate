// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
let config = getDefaultConfig(__dirname);
const folders = ['components','constants','screens','store','utils']
let ALIASES = {}
folders.forEach(folder => {
    ALIASES[folder] = `${__dirname}/src/${folder}`
})

config.resolver.resolveRequest = (context, moduleName, platform) => {
// Ensure you call the default resolver.
return context.resolveRequest(
    context,
    // Use an alias if one exists.
    ALIASES[moduleName] ?? moduleName,
    platform
);
};
  
module.exports = config;
