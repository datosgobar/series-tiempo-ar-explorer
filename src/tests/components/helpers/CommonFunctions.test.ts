import {maxNotNull, minNotNull, removeDuplicates, valueExist, valuesFromObject} from "../../../helpers/common/commonFunctions";


describe("QueryParams", () => {
    it("returns ['1', '2']", () => {
        const obj = {foo: '1', bar: '2'};
        expect(valuesFromObject(obj)).toEqual(['1', '2']);
    });

    it("returns -3", () => {
        expect(minNotNull(-3, null)).toEqual(-3);
        expect(minNotNull(undefined, -3)).toEqual(-3);
    });

    it("returns 5", () => {
        expect(maxNotNull(5, null)).toEqual(5);
        expect(maxNotNull(undefined, 5)).toEqual(5);
    });

    it("returns true only if the value is not empty, null nor undefined", () => {
        expect(valueExist(1)).toEqual(true);
        expect(valueExist(null)).toEqual(false);
        expect(valueExist(undefined)).toEqual(false);
        expect(valueExist("")).toEqual(false);
    });

    it("returns [1,2,3,4]", () => {
        expect(removeDuplicates([1,2,1,3,3,4])).toEqual([1,2,3,4]);
    });

});
