import { Nonfig } from '../../src/interfaces';
import * as sinon from 'sinon';
import { Configuration, nonfig, NonfigRequest } from '../../index';
import { options, textualTestResponse } from '../constants';
import { expect } from 'chai';
import { get } from 'lodash';

describe('Configuration Entity', () => {
    let api: Nonfig;
    let request: sinon.SinonStub;

    beforeEach(() => {
        api = nonfig(options);
        request = sinon.stub(NonfigRequest, 'exec');
    });

    afterEach(() => {
        request.restore();
    });

    it('should return the parsed data', async () => {
        const name = '/some/path/test-1';
        request.resolves(textualTestResponse);
        const configuration = await api.findByName(name);
        expect(request.calledOnce).to.be.true;
        expect((configuration as Configuration[]).length).to.equal(1);
        expect(get(configuration, '0.fullyQualifiedName')).to.equal(name);
        expect(get(configuration, '0.data')).to.equal('some-text-data');
    });
});
