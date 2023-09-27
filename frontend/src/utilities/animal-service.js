import * as animalApi from './animalApi';

export async function getAnimals(){
    try {
        const data = await animalApi.index();
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function getAnimal(id){
    try {
        const foundAnimal = await animalApi.detail(id)
        return foundAnimal
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}