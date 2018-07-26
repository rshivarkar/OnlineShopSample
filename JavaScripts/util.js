function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key].toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) != -1) {
            objects.push(obj);
        }
    }
    return objects;
}

Array.prototype.removeValue = function (name, value) {
    var array = $.map(this, function (v, i) {
        return v[name] === value ? null : v;
    });
    this.length = 0; //clear original array
    this.push.apply(this, array); //push all elements except the one we want to delete
}