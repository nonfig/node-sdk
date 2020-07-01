import * as sinon from 'sinon';
import { options, testResponse } from '../constants';
import { expect } from 'chai';
import { get } from 'lodash';
import { NonfigRequest } from '../../src/request';
import { nonfig, Nonfig } from '../../index';
import { Configuration } from '../../src/configuration.entity';

describe('Find Configurations by name', () => {
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
        const name = '/some/path/test-1';
        request.resolves(testResponse);
        const configuration = await api.findByName(name);
        expect(request.calledOnce).to.be.true;
        expect((configuration as Configuration[]).length).to.equal(1);
        expect(get(configuration, '0.fullyQualifiedName')).to.equal(name);
    });

    it('should return empty array for non-existent name ', async () => {
        const name = 'non-existent-name';
        request.resolves([]);
        const configurations = await api.findByName(name);
        expect(request.calledOnce).to.be.true;
        expect((configurations as Configuration[]).length).to.equal(0);
    });
});
