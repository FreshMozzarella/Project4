import * as birdApi from './birdApi';

export async function getBirds(){
    try {
        const data = await birdApi.index();
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function getBird(id){
    try {
        const foundBird = await birdApi.detail(id)
        return foundBird
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}