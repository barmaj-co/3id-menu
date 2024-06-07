function getMenuItems() {
    return [
        {
            displayName: "كريبات",
            bsTarget: "menu-crebe",
            imagePlace: "crebe",
            items: getCrebeItems()
        },
        {
            displayName: "بيتزا",
            bsTarget: "menu-pizza",
            imagePlace: "pizza",
            items: getPizzaItems()
        },
        {
            displayName: "سندوتشات",
            bsTarget: "menu-sandwich",
            imagePlace: "sandwich",
            items: getSandwichItems()
        },
    ];
}

function getCrebeItems() {
    return [
        {
            type: 'crebe',
            imagePath: 'crepe.jpg',
            name: 'كريب ميكس فراخ',
            description: 'فراخ',
            price: 55.0
        },
        {
            type: 'crebe',
            imagePath: 'crepe.jpg',
            name: 'كريب بانيه حار',
            description: 'فراخ',
            price: 50.0
        },
        {
            type: 'crebe',
            imagePath: 'crepe.jpg',
            name: 'كريب ميكس لحوم',
            description: 'لحوم',
            price: 65.0
        },
        {
            type: 'crebe',
            imagePath: 'crepe.jpg',
            name: 'كريب كفته',
            description: 'كفته بلدى',
            price: 65.0
        },
    ];
}

function getPizzaItems() {
    return [
        {
            type: 'pizza',
            imagePath: 'pizza.jpg',
            name: 'بيتزا فراخ',
            description: 'فراخ',
            price: 80.0
        },
        {
            type: 'pizza',
            imagePath: 'pizza.jpg',
            name: 'بيتزا لحوم',
            description: 'لحوم',
            price: 85.0
        },
    ];
}

function getSandwichItems() {
    return [
        {
            type: 'sandwich',
            imagePath: 'kofta-feno.jpg',
            name: 'ساندوتش كفته',
            description: 'كفته + عيش فينو',
            price: 15.0
        },
        {
            type: 'sandwich',
            imagePath: 'kofta-shamy.png',
            name: 'ساندوتش كفته شامى',
            description: 'كفته + عيش شامى',
            price: 20.0
        },
    ];
}