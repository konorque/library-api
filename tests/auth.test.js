const supertest = require('supertest');
const app = require('../app');

test('authStatus', async () => {
    const res = await supertest(app).post('/login').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Wrong username or password');
});

test('postRegister', async ()=>{
    const res = await supertest(app).post('/register').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Wrong username or password');
})

test('getBooksWithoutAuthorization', async ()=>{
    const res = await supertest(app).get('/me/books');
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Not authenticated');
})