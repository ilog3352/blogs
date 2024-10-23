## 实现对象使用for of
```js
const obj = {
    a: 1,
    b: 2,
    [Symbol.iterator]() {
        const properties = Object.keys(this);
        let index = 0;

        return {
            next() {
                if (index < properties.length) {
                    return {
                        value: this[properties[index++]],
                        done: false
                    };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

for (let value of obj) {
    console.log(value);
}
```