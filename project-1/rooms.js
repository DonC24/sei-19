let rooms = [{
    name:"Academy Entrance",
    color: "blue",
    imgsrc: 'images/entrance.jpg',
    description: "You're at the entrance of the academy",
    exits: { //room is array number
        north: 1
    }
},
{
    name: "The Courtyard",
    color: "red",
    imgsrc: 'images/courtyard.jpg',
    description: "You’re in a beautiful courtyard.",
    exits: {
        south: 0,
        north: 2,
        west: 4,
        east: 5
    }
},
{
    name: "Academy Fields",
    color: "yellow",
    imgsrc: 'images/field.jpg',
    description: "You’re entering the fields of the academy; a pathway leads to the forest nearby.",
    exits: {
        north: 3,
        south: 1
    }
},
{
    name: "The Forest",
    color: "orange",
    imgsrc: 'images/courtforestyard.jpg',
    description: "You’re in the forest, maybe you should turn back before you get lost.",
    exits: {
        south: 2
    }
},
{
    name: "The Armoury",
    color: "pink",
    imgsrc: 'images/armory.jpg',
    description: "You’re in the armoury. A lone dagger lies on the floor.",
    exits: {
        east: 1
    }
},
{
    name: "The Library",
    color: "pink",
    imgsrc: 'images/library.jpg',
    description: "You're in the library, surrounded by shelves of books, both old and new.",
    exits: {
        west: 1
    }
}
];