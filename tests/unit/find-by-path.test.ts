import * as sinon from 'sinon';
import { connection, options, testResponse } from '../constants';
import Api from '../../src/api';
import { expect } from 'chai';
import { get } from 'lodash';
import { IConfiguration } from '../../src/interfaces';
import { NonfigRequest } from '../../src/request';

/* tslint:disable:no-unused-expression */
describe('Find Configurations by path', () => {
    let api: Api;
    let request: sinon.SinonStub;

    beforeEach(() => {
        api = new Api(connection, options);
        request = sinon.stub(NonfigRequest, 'exec');
    });

    afterEach(() => {
        request.restore();
    });

    it('should return configuration', async () => {
        const path = '/some/path/';
        request.resolves(testResponse);
        const configuration = await api.findByPath(path);
        expect(request.calledOnce).to.be.true;
        expect((configuration as IConfiguration[]).length).to.equal(1);
        expect(get(configuration, '0.path')).to.equal(path);
    });

    it('should return empty array for non-existent path ', async () => {
        const path = 'non-existent';
        request.resolves([]);
        const configurations = await api.findByPath(path);
        expect(request.calledOnce).to.be.true;
        expect((configurations as IConfiguration[]).length).to.equal(0);
    });
});
