import QueryParams from "../../api/QueryParams";


describe("QueryParams", () => {
    let params: QueryParams;

    beforeEach(() => {
        params = new QueryParams(['serie01', 'serie02', 'serie03']);
    });

    it("returns the ids", () => {
        expect(params.getIds()).toEqual('serie01,serie02,serie03');
    });

    it("returns the collapse value", () => {
        params.setCollapse('year');
        expect(params.getCollapse()).toEqual('year');
    });

    it("returns all values even the empty", () => {
        expect(params.asJson()).toEqual({'ids': 'serie01,serie02,serie03', 'collapse': undefined, 'limit': 1000, 'start': 0});
    });

    it("returns all values without empty", () => {
        expect(params.asQuery()).toEqual({'ids': 'serie01,serie02,serie03', 'limit': 1000, 'start': 0});
    });
});
