/**
 * API.js Created by sandy on 11/10/2019
 */
let nextName = 0;

export function initItems (cb) {
    const data = [
        { color: "#FF0000", name: 1 },
        { color: "#00FF00", name: 2 },
        { color: "#0000FF", name: 3 }
    ];
    nextName = data.length
    setTimeout(() => cb(data), 2000)
}

export function newItem (color, cb) {
    nextName += 1
    const data = {
        color: color,
        name: nextName
    };
    setTimeout(() => cb(data), 500);
}
