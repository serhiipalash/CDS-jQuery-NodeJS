//parseOb.js

/**
 * Parse object with nested objects and return it's values or keys sepatated by saparator
 * @param  {object} object    - Object to parse
 * @param  {string} separator - String contains separator
 * @param  {string} type      - Parsing type. Can be 'value' or 'key'.
 * @return {string}             String with all values or keys in object and all nested objects
 */
function parseOb(object, separator, type) {
    var keys = [],
        values = [];

    separator = separator || ', ';

    if (typeof object === 'string' || typeof object === 'number') {
        return object;
    }

    if (!type && separator === 'key' || separator === 'value') {
        type = separator;
        separator = ', ';
    }

    if (!type) {
        type = 'value';
    }

    for (var key in object) {
        if (object[key] instanceof Object) {
            keys.push(key);
            keys.push( parseOb(object[key], separator, type) );

            if (object[key] === null || object[key] === '' || !/\S/.test(object[key])) {
                continue;
            }

            values.push( parseOb(object[key], separator, type) );
        } else {
            keys.push(key);

            if (object[key] === null || object[key] === '' || !/\S/.test(object[key])) {
                continue;
            }

            values.push(object[key]);
        }
    }

    if (type === 'value') {
        return values.join(separator);
    }

    if (type === 'key') {
        return keys.join(separator);
    }
}
