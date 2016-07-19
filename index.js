module.exports = PriorityQueue;

function PriorityQueue(comparator) {
    this._comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
    this._elements = [];
}

PriorityQueue.DEFAULT_COMPARATOR = function(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    } else {
        a = a.toString();
        b = b.toString();

        if (a == b) return 0;

        return (a > b) ? 1 : -1;
    }
}

PriorityQueue.prototype.isEmpty = function () {
    return this.size() === 0;
}

PriorityQueue.prototype.size = function () {
    return this._elements.length;
}

PriorityQueue.prototype.peek = function () {
    if (this.isEmpty()) {
        return null;
    }
    return this._elements[0];
}

PriorityQueue.prototype.deq = function () {
    if (this.isEmpty()) {
        return null;
    }
    var last = this._elements.pop();
    var first = this.peek();
    var size = this.size();

    this._elements[0] = last;
    var current = 0;

    while (current < size) {
        var largest = current;
        var left = current * 2 + 1;
        var right = current * 2 + 2;

        if (left < size && this._compare(current, left) < 0) {
            largest = left;
        }
        if (right < size && this._compare(current, right) < 0) {
            largest = right;
        }
        if (largest === current) break;

        this._swap(current, largest);
        current = largest;
    }

    return first;
}

PriorityQueue.prototype.enq = function (element) {
    var size = this._elements.push(element);
    var current = size - 1;

    while (current > 0) {
        var parent = Math.floor((current - 1) / 2);

        if (this._compare(current, parent) <= 0) break;

        this._swap(parent, current);
        current = parent;
    }
    return size;
}

PriorityQueue.prototype._compare = function (a, b) {
    return this._comparator(this._elements[a], this._elements[b]);
}

PriorityQueue.prototype._swap = function (a, b) {
    var temp = this._elements[a];
    this._elements[a] = this._elements[b];
    this._elements[b] = temp;
}
