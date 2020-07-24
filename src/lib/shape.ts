import { Author } from './author'

// Union type
type ShapeType = 'Circle' | 'Rectangle' | 'Square'

interface SpecialProperties {
    label: string,
    borderColor: string,
}


interface BaseShape {
    id: number;
    type: ShapeType;
    color: string;
    author?: Author;
    specialProperties?: SpecialProperties
}

export interface Circle extends BaseShape { 
    type: 'Circle';
    radius: number;
}

export interface Square extends BaseShape {
    type: 'Square';
    sideLength: number;
}

export interface Rectangle extends BaseShape {
    type: 'Rectangle'
    height: number;
    width: number;
}


// Discriminated Unions::
// The interfaces unioned under Shape share a special property called a `Discriminant`
// The `Discriminant` is a statically defined primitive (e.g. a string constant, number, or keys of an enum)
// that I've chosen to call `type` in this case (it could be 'kind', or 'foo')

// Because the value is known at compile time, the compiler can 'discrminate' between
// members of this type when you evaluate the discriminant (see example in Shapes.tsx)
export type Shape = Circle | Square | Rectangle


export interface SpecialShape extends BaseShape {
    specialProperties: SpecialProperties
}

// TypeGuards:: 
// This is an example of a user defined `typeguard`. 
// A type guard is user defined predicate on an object that
// casts matching arguments to the specified type.

// In a sense, a typeguard is another way to 'strong arm' the compiler.
// Because it evaluates some presumably accurate condition however,
// a well defined typeguard is preferable to typecasting
export const isSpecial = (shape: BaseShape): shape is SpecialShape => {
    return (shape as any).specialProperties != null;
}

// Note that typeguards are not 'compiled away', they are evaluated
// at run time as boolean expressions, and so can have potential performance impact.

// typeguards are still typecasting however, and a poorly
// defined one can break the guarantees of type safety:
export const everyoneIsSpecial = (_shape: BaseShape): _shape is SpecialShape => {
    return true
}


// Records Over Union Types
// A Record over a Union type is exhaustive, i.e.
// every member must be present
const SHAPE_DESCRIPTORS: Record<ShapeType, string> = {
    'Circle': 'a round shape.',
    'Square': 'a special rectangle.',
    'Rectangle': 'sort of like a square.' 
}

// Partial::
// If you want to skip some keys in any object, you can use the utility type Partial
// The type below lets us know that even though all the keys won't be present, 
// every key in this object will be from `ShapeType`
const QUADRILATERAL_INFO: Partial<Record<ShapeType, string>> = {
    'Rectangle': "It's area is given by width x height.",
    'Square': "It's area is given by sidelength squared!",
}


// Pick::
// Sort of like partial, except you specify which keys from `Type`
// that you want to use. The properties you 'pick' have the same
// type as the Antecedent.
const ELLIPSE_INFO: Pick<Record<ShapeType, string>, 'Circle'> = {
    'Circle': 'A Circle is a special case of an ellipse!'
}

// example usage: type gaurds, Records over unions, partial records, `in` keyword
export const displayShape = (shape: Shape): string => {
    let message = `This ${shape.type} was submitted by `
    message += (shape.author ? shape.author.name : 'an anonymous user') + '.\n'
    message += `It is ${shape.color}.\n`
    if (isSpecial(shape)) {
        const { borderColor, label } = shape.specialProperties;
        message += `It's border is ${borderColor}\n`
        message += 'This shape\'s label reads:\n'
        message += `${label}\n`
    }
    message += `Did you know? A ${shape.type} is ${SHAPE_DESCRIPTORS[shape.type]}\n`
    
    if (shape.type in QUADRILATERAL_INFO) {
        message += QUADRILATERAL_INFO[shape.type]
    }

    if (shape.type === 'Circle') {
        message += ELLIPSE_INFO[shape.type]
    }

    return message
}
