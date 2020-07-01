import * as sinon from 'sinon';
import { options, testResponse } from '../constants';
import { nonfig, Nonfig } from '../../index';
import { expect } from 'chai';
import { get } from 'lodash';
import { NonfigError } from '../../src/error';
import { NonfigRequest } from '../../src/request';

describe('Find Configurations by id', () => {
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
        const stubId = 'random-id';
        request.resolves(get(testResponse, '0'));
        const configuration = await api.findById(stubId);
        expect(request.calledOnce).to.equal(true);
        expect(get(configuration, 'id')).to.equal(stubId);
        expect(get(configuration, 'version')).to.equal(1);
    });

    it('should return error for non-existent id', async () => {
        const stubId = 'invalid-id';
        const error = new NonfigError('Not Found');
        request.throws(error);
        try {
            await api.findById(stubId);
        } catch (e) {
            expect(e instanceof NonfigError).to.be.true;
            expect((e as NonfigError).message).to.equal('Not Found');
        }
        expect(request.calledOnce).to.be.true;
    });
});
