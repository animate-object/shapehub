import { shapesAPI } from '../__mock_server/server.js';
import { Shape } from './shape'
/** 
    Record types::
    Record<KeyType, ValueType> is a utility type defining an object where keys are KeyType
    and values are ValueType,
    For instance a Record<number, string[]> could have keys like this: 

    const example: Record<number, string[]>  = {
        1: ['a', 'b', 'c'],
        2: ['x', 'y', 'z']
    }
*/


export const getShapes = (limit: number): Record<number, Shape> => {
    const apiData =  shapesAPI(limit)

    // typecasting is one of typescript's 'escape hatches'
    // when you know more than the compiler, you can override it
    // - typecasting should generally be avoided because makes typechecking less effective
    // - appropriate on the edges of your application, if you're confident about your data source
    // - a tool in the toolbox to be used sparingly
    const decoded = JSON.parse(apiData) as Record<number, Shape>
    console.log(decoded);
    return decoded
}