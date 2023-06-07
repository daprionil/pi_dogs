const {
    fixedDog,
    parseImageDog,
    getAverageHeightOrWeight,
    getYearsOld,
    getAndParseTemperaments
} = require('../../src/utils/fixedDog');

describe('La función para formatear los valores Dog recibidos para ser entregados como respuesta', () => {
    describe('La función parseImageDog debe',() => {
        const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs9QCE6xoS_WQHh0P-Neg4IHTzcUb3jmSRuIYcnVnOVQEFx6hfz8hJmseWsgCoVtxVfos&usqp=CAU';
        const referenceImageUrl = (refImage) => `https://cdn2.thedogapi.com/images/${refImage}.jpg`;
        const urlImage = "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"

        it('obtener una url por default',() => {
            expect(parseImageDog(null, null)).toEqual(defaultImageUrl);
        });
        
        it('obtener por medio de su referencia', () => {
            const referenceImage = 'BJa4kxc4X';
            expect(parseImageDog(null, referenceImage)).toEqual(referenceImageUrl(referenceImage));
        });

        it('obtener la URL enviada como string', () => {
            expect(parseImageDog(urlImage)).toEqual(urlImage);
        });

        it('obtener la URL enviada como estructura de Objeto', () => {
            expect(parseImageDog({url:urlImage})).toEqual(urlImage);
        });

        it('obtener la imagen por default recibiendo valores aleatorios de diferentes tipos de dato', () => {
            expect(parseImageDog(0)).toEqual(defaultImageUrl);
            expect(parseImageDog(1)).toEqual(defaultImageUrl);
            expect(parseImageDog(null)).toEqual(defaultImageUrl);
            expect(parseImageDog(Math.random() * 10)).toEqual(defaultImageUrl);
            expect(parseImageDog({})).toEqual(defaultImageUrl);
            expect(parseImageDog([])).toEqual(defaultImageUrl);
            expect(parseImageDog(undefined)).toEqual(defaultImageUrl);
            expect(parseImageDog('')).toEqual(defaultImageUrl);
            expect(parseImageDog(new Set([]))).toEqual(defaultImageUrl);
            expect(parseImageDog(new Map([[]]))).toEqual(defaultImageUrl);
        })
    });

    describe('La función getAverageHeightOrWeight debe', () => {
        it('retornar la media de acuerdo a el objeto', () => {
            const values1 = {
                imperial: "6 - 13",
                metric:"3 - 6"
            };

            const values2 = {
                imperial: "25 - 27",
                metric:"64 - 69"
            };

            const values3 = {
                imperial: "50 - 60",
                metric:"23 - 27"
            };

            expect(getAverageHeightOrWeight(values1)).toEqual('11.8');
            expect(getAverageHeightOrWeight(values2)).toEqual('59.3');
            expect(getAverageHeightOrWeight(values3)).toEqual('67.5');
        })
        it('retorna 0 si el valor es falsy', () => {
            expect(getAverageHeightOrWeight(null)).toEqual(0);
            expect(getAverageHeightOrWeight([])).toEqual(0);
            expect(getAverageHeightOrWeight({})).toEqual(0);
        });
    });

    describe('La función getYearsOld debe', () => {
        it('retornar los años de edad pasada como argumento si es un número', () => {
            expect(getYearsOld(10)).toBe(10);
            expect(getYearsOld(19)).toBe(19);
            expect(getYearsOld(90)).toBe(90);
            expect(getYearsOld(20)).toBe(20);
        });

        it('retornar el promedio de años de edad', () => {
            expect(getYearsOld(null, '10 - 13 years')).toEqual('10');
            expect(getYearsOld(10, '13 years')).toEqual('13');
            expect(getYearsOld(null, '11')).toEqual('11');
        });

        it('retornar 0 si no existen valores o es un tipo de dato no válido', () => {
            expect(getYearsOld(null, null)).toEqual(0);
            expect(getYearsOld(null, {})).toEqual(0);
            expect(getYearsOld('nothing', [])).toEqual(0);
            expect(getYearsOld(null, 'eso')).toEqual(0);
            expect(getYearsOld(['refin'], null)).toEqual(0);
            expect(getYearsOld([], [])).toEqual(0);
            expect(getYearsOld(false, undefined)).toEqual(0);
            expect(getYearsOld(null, true)).toEqual(0);
        });
    });
});

/* 

{
    "name": "Doberman europeo 2",													"image":"https://i.pinimg.com/originals/86/fa/c3/86fac3681551d06f7f8ddaad03b3dc3e.jpg",
    "height": "72",
    "weight": "100",
    "temperaments": [1,8,18,44,9,19],
    "yearsOld": "18"
}

*/