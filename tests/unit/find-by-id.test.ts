import * as sinon from 'sinon';
import { connection, options, testResponse } from '../constants';
import Api from '../../src/api';
import { expect } from 'chai';
import { get } from 'lodash';
import { NonfigError } from '../../src/error';
import { NonfigRequest } from '../../src/request';

/* tslint:disable:no-unused-expression */
describe('Find Configurations by id', () => {
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
