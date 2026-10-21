const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

process.env.JWT_SECRET = 'test-secret';

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { runtimeAdapters: { os: require('os') } });
}, 120000);

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

async function getToken(username, password){
    await supertest(app).post('/register').send({ username, password });
    const login = await supertest(app).post('/login').send({ username, password });
    const token = login.body.token;
    return token;
}

test('bookNotFoundGives404', async () => {
    const res = await supertest(app).get(`/books/507f1f77bcf86cd799439011`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Not found');
});

test('createBooksWithEmptyBody', async ()=>{
    const token = await getToken('bookuser', 'password7');
    const res = await supertest(app).post(`/books`).set('Authorization', `Bearer ${token}`).send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Fields are empty');
})