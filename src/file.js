const b = {
    name: 'John',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
    },
    hobbies: ['reading', 'gardening', 'hiking'],
    favoriteFoods: [
        {
            name: 'pizza',
            ingredients: ['dough', 'tomato sauce', 'cheese', 'pepperoni']
        },
        {
            name: 'sushi',
            ingredients: ['rice', 'nori seaweed', 'raw fish', 'vegetables']
        }
    ],
    friends: [
        {
            name: 'Alice',
            age: 28,
            address: {
                street: '456 Oak St',
                city: 'Anytown',
                state: 'CA',
                zip: '12345'
            },
            hobbies: ['painting', 'swimming'],
            favoriteFoods: [
                {
                    name: 'burger',
                    ingredients: ['bun', 'beef patty', 'lettuce', 'tomato', 'onion']
                },
                {
                    name: 'sushi',
                    ingredients: ['rice', 'nori seaweed', 'raw fish', 'vegetables']
                }
            ]
        },
        {
            name: 'Bob',
            age: 32,
            address: {
                street: '789 Main St',
                city: 'Anytown',
                state: 'CA',
                zip: '12345'
            },
            hobbies: ['hiking', 'camping'],
            favoriteFoods: [
                {
                    name: 'taco',
                    ingredients: ['tortilla', 'beef', 'lettuce', 'tomato', 'salsa']
                },
                {
                    name: 'pad thai',
                    ingredients: ['rice noodles', 'shrimp', 'tofu', 'vegetables', 'peanuts']
                }
            ]
        }
    ]
};

const a = {...b, friends: b.friends.map(el=>el.name==='Alice' ? {...el, hobbies: el.hobbies.map(el2=>el2 === 'swimming' ? 'football' : el2)}:el)}
console.log(a.friends[0])