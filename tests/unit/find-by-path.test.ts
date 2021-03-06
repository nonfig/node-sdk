import * as sinon from 'sinon';
import { options, testResponse } from '../constants';
import { expect } from 'chai';
import { get } from 'lodash';
import { NonfigRequest } from '../../src/request';
import { nonfig, Nonfig } from '../../index';
import { Configuration } from '../../src/configuration.entity';

describe('Find Configurations by path', () => {
    let api: Nonfig;
    let request: sinon.SinonStub;

    beforeEach(() => {
        api = nonfig(options);
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
        expect((configuration as Configuration[]).length).to.equal(1);
        expect(get(configuration, '0.path')).to.equal(path);
    });

    it('should return empty array for non-existent path ', async () => {
        const path = 'non-existent';
        request.resolves([]);
        const configurations = await api.findByPath(path);
        expect(request.calledOnce).to.be.true;
        expect((configurations as Configuration[]).length).to.equal(0);
    });
});
