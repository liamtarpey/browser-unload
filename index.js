/**
 * Docs are a little hazy on the 'beforeunload' listener
 * but we cannot set custom text, to avoid us scaring the user for eg
 * with a message like 'DO NOT CLOSE OR YOUR COMPUTER WILL EXPLODE'
 *
 * Quirks:
 * - Chrome requires 'returnValue' to be appended to the event or nothing works
 * - Safari doesn't remove event listener if an empty string is returned
 * - Firefox doesn't remove event listener if we bind a method to it: ('beforeunload', handler.bind(null, callback))
 * - All (except Chrome) require a string to be returned
 * - All: Doesn't work whatsoever if the user hasn't interacted with the page
 * - All: Async network calls DO NOT WORK anywhere in this operation. If you make one from the 'handler', it will stay pending
 *        until the user either cancels (then it's sent as normal), or leaves (then nothing is sent as browser has unloaded)
 *
 * Docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
 *
 * @param  {Object} e
 * @return {String}
 * @private
 */
const handler = (e) => {
    const requiredTextValue = ' '; // Deliberate space - do not remove!

    if (e) {
        e.preventDefault();
        e.returnValue = requiredTextValue;
    }

    return requiredTextValue;
};

/**
 * Enables 'beforeunload' across all pages
 * @public
 */
const enable = () => {
    window.addEventListener('beforeunload', handler);
};

/**
 * Disables 'beforeunload' across all pages
 * @public
 */
const disable = () => {
    window.removeEventListener('beforeunload', handler);
};

// Exports
module.exports.enableBrowserUnload = enable;
module.exports.disableBrowserUnload = disable;
