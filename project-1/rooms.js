let rooms = [{
    name:"room 1",
    color: "blue",
    description: "The room looks like this (array 0",
    exits: { //room is array number
        north: 1
    }
},
{
    name: "room 2",
    color: "red",
    description: "This is room 2 (array 1)",
    exits: {
        south: 0,
        north: 2,
        west: 4,
        east: 5
    }
},
{
    name: "room 3",
    color: "yellow",
    description: "This is room 3 (array 2)",
    exits: {
        north: 3,
        south: 1
    }
},
{
    name: "room 4",
    color: "orange",
    description: "This is room 4 (array 3)",
    exits: {
        south: 2
    }
},
{
    name: "room 5",
    color: "pink",
    description: "This is room 5 (array 4)",
    exits: {
        east: 1
    }
},
{
    name: "room 6",
    color: "pink",
    description: "This is room 6 (array 5)",
    exits: {
        west: 1
    }
}
];