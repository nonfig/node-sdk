import * as sinon from 'sinon';
import { options, testResponse } from '../constants';
import { expect } from 'chai';
import { get } from 'lodash';
import { NonfigRequest } from '../../src/request';
import { nonfig, Nonfig } from '../../';

describe('Find Configurations by labels', () => {
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
        const labels = ['test'];
        request.resolves(testResponse);
        const configuration = await api.findByLabels(labels);
        expect(request.calledOnce).to.be.true;
        expect(configuration.length).to.equal(1);
        expect(get(configuration, '0.label')).to.eql(labels);
    });

    it('should return empty array for non-existent label', async () => {
        const labels = ['non-existent-label'];
        request.resolves([]);
        const configurations = await api.findByLabels(labels);
        expect(request.calledOnce).to.be.true;
        expect(configurations.length).to.equal(0);
    });
});
