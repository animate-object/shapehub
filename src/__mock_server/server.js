import { COLORS, NAMES, LOCATIONS } from "./data"

const shuffleInPlace = (array) => {
    for (let i = array.length - 1; i > 0; i --) {
        const j = Math.floor(Math.random() * ( i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

const randomFromList = (list) => list[Math.floor(Math.random() * list.length)]

const circle = (scaleFactor) => ({
    type: 'Circle',
    radius: Math.floor(Math.random() * (scaleFactor / 2))
})


const square = (scaleFactor) => ({
    type: 'Square',
    sideLength: Math.floor(Math.random() * scaleFactor)
})

const rectangle = (scaleFactor) => ({
    type: 'Rectangle',
    height: Math.floor(Math.random() * scaleFactor),
    width: Math.floor(Math.random() * scaleFactor)
})

const randomShape = (scaleFactor) => {
    const generator = randomFromList([circle, rectangle, square])
    return generator(scaleFactor)
}

const color = () => randomFromList(COLORS)

const author = () => ({
    name: randomFromList(NAMES),
    location: Math.random() > 0.8 ? randomFromList(LOCATIONS) : undefined
})

const special = () => ({
        borderColor: color(),
        label: `I'm a ${randomFromList([5, 6, 7, 8, 9, 10])} ⭐ shape!`
})


export const shapesAPI = (limit) => {
    const shapes = Array(limit).fill(0).map((_, idx) => ({
        ...randomShape(200 + Math.random() * 500),
        color: color(),
        author: Math.random() > .5 ? author() : undefined,
        id: idx,
        specialProperties: Math.random() > .97 ? special() : undefined
    }))
    shuffleInPlace(shapes)

    return JSON.stringify(shapes.reduce(
        (acc, shape) => ({...acc, [shape.id]: shape}), {}
    ))
}