import * as sinon from "sinon";
import {connection, options} from "../constants";
import Api from "../../src/api"
import {expect} from "chai";
import {get} from "lodash";
import {IConfigurationResponse} from "../../src/interfaces/IConfiguration";

describe("Find Configurations by id", () => {
    let api: Api;

    beforeEach(() => {
        api = new Api(connection, options);
    })

    it("should return configuration", async () => {
        const stubId = "random-id"
        const response: IConfigurationResponse = {
            success: true,
            error: null,
            count: 1,
            data: [
                {
                    "label": [],
                    "version": 1,
                    "name": "test-1",
                    "path": "/some/path/",
                    "description": "",
                    "type": "JSON",
                    "data": "{}",
                    "fullyQualifiedName": "/some/path/test-1",
                    "id": "random-id"
                }
            ]
        }
        const stub = sinon.stub(api, "findById").resolves(response);
        const configuration = await api.findById(stubId);
        expect(stub.calledOnce).to.be.true;
        expect(get(configuration, "data.0.id")).to.equal(stubId);
        expect(get(configuration, "data.0.version")).to.equal(1);
    })

    it("should return error ", async () => {
        const stubId = "invalid-id"
        const response = {
            success: false,
            error: "Not Found",
            data: [],
            count: 0
        }
        const stub = sinon.stub(api, "findById").resolves(response);
        const configuration = await api.findById(stubId);
        expect(stub.calledOnce).to.be.true;
        expect(configuration.count).to.equal(0);
        expect(configuration.error).to.equal("Not Found");
    })
})