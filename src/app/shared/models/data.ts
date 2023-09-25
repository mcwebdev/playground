export const simpleArrayOfNumbers = [5, 10, 15, 20, 25];
export const mixedTypes = [7, "apple", 3.14, "banana", 42];
export const nestedArrays = [[1, 2], [3, "four"], [5, 6, [7, "eight"]]];
export const simpleObject = { "name": "John", "age": 30, "city": "New York" };
export const mixedObject = { "id": 1, "info": { "name": "Alice", "skills": ["Python", "JS"] }, "grades": [90, 85, 80] };
export const complexNestedObjects = {
    "users": [
        { "id": 1, "name": "Bob", "orders": [{ "product": "Laptop", "price": 1000 }] },
        { "id": 2, "name": "Sara", "orders": [{ "product": "Phone", "price": 500 }, { "product": "Tablet", "price": 300 }] }
    ]
};
export const arraysWithGotchas = [1, "2", null, undefined, NaN, { "key": "value" }, [3, "four"]];
export const objectWithFunctions = {
    "calculate": function (x: number) { return x * 2; },
    "data": [1, 2, 3],
    "info": undefined
};
export const mixedTypesWithSpecialCharacters = [1, "text with spaces", 3.14, { "key": "value with \"quotes\"" }, [5, "six"], null];
