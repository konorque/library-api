const httpError = require('./httpError');

test('isError', ()=>{
    const err = httpError(404, 'Not found');
    expect(err).toBeInstanceOf(Error);
})

test('statusCheck', ()=>{
    const statusCheck = httpError(404, 'Not found');
    expect(statusCheck.status).toBe(404);
})

test('messageCheck', ()=>{
    const messageCheck = httpError(404, 'Not found');
    expect(messageCheck.message).toBe('Not found');
})