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
            hobbies: ['painting', 'swimming'], // swimming -> football
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
                    ingredients: ['tortilla', 'beef', 'lettuce', 'tomato', 'salsa']  // beef-> pork
                },
                {
                    name: 'pad thai',
                    ingredients: ['rice noodles', 'shrimp', 'tofu', 'vegetables', 'peanuts']
                }
            ]
        }
    ]
};

const pork = {
    ...b,
    friends: b.friends.map(el => el.name !== 'Bob'
        ? el
        : {
            ...el, favoriteFoods: el.favoriteFoods.map(f => f.name !== 'taco'
                ? f
                : {...f, ingredients: f.ingredients.map(i => i === 'beef' ? 'pork' : i)})
        }),
    name: 32
}


console.log(pork.friends[1].favoriteFoods)
