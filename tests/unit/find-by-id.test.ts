import * as sinon from 'sinon';
import { options, testResponse } from '../constants';
import nonfig from '../../index';
import { expect } from 'chai';
import { get } from 'lodash';
import { NonfigError } from '../../src/error';
import { NonfigRequest } from '../../src/request';
import Api from '../../src/api';

describe('Find Configurations by id', () => {
    let api: Api;
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
        request.resolves(testResponse);
        const configuration = await api.findById(stubId);
        expect(request.calledOnce).to.be.true;
        expect(get(configuration, '0.id')).to.equal(stubId);
        expect(get(configuration, '0.version')).to.equal(1);
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
