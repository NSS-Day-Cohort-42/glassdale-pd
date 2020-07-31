
// Add a `convertItems()` method to Array that is a Proxy to `map()`
if (!("convert" in Array.prototype)) {
    Object.defineProperty(Array.prototype, "convert", {
        value: new Proxy(Array.prototype.map, {
            apply: function ($target, $this, $args) {
                const html = $target.apply($this, $args).join("")
                return Object.create(null, {
                    toDOM: {
                        value: (target) => {
                            target.innerHTML = html
                        }
                    }
                })
            }
        })
    })
}

// Add a `listenFor()` method on any EventTarget. Proxies to `addEventListener`.
if (!("listenFor" in EventTarget.prototype)) {
    Object.defineProperty(EventTarget.prototype, "listenFor", {
        value: new Proxy(EventTarget.prototype.addEventListener, {
            apply: function (_target, _this, _args) {
                return _target.apply(_this, _args)
            }
        })
    })
}
