import * as sinon from 'sinon';
import { options, testResponse } from '../constants';
import Api from '../../src/api';
import { expect } from 'chai';
import { get } from 'lodash';
import { IConfiguration } from '../../src/interfaces';
import { NonfigRequest } from '../../src/request';
import * as NonfigInternal from '../../index';

describe('Find Configurations by name', () => {
    let api: Api;
    let request: sinon.SinonStub;
    let nonfig: any;

    beforeEach(() => {
        nonfig = NonfigInternal;
        api = nonfig(options);
        request = sinon.stub(NonfigRequest, 'exec');
    });

    afterEach(() => {
        request.restore();
    });

    it('should return configuration', async () => {
        const name = '/some/path/test-1';
        request.resolves(testResponse);
        const configuration = await api.findByName(name);
        expect(request.calledOnce).to.be.true;
        expect((configuration as IConfiguration[]).length).to.equal(1);
        expect(get(configuration, '0.fullyQualifiedName')).to.equal(name);
    });

    it('should return empty array for non-existent name ', async () => {
        const name = 'non-existent-name';
        request.resolves([]);
        const configurations = await api.findByName(name);
        expect(request.calledOnce).to.be.true;
        expect((configurations as IConfiguration[]).length).to.equal(0);
    });
});
