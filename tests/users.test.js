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

test('registerCreatesSuccessfully', async () => {
    const username = 'user';
    const password = 'password123';
    const res = await supertest(app).post('/register').send({ username, password });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe(`User ${username} created successfully`);
});

test('loginGivesToken', async()=>{
    const username = 'user1';
    const password = 'password1';
    await supertest(app).post('/register').send({ username, password });
    const res = await supertest(app).post('/login').send({ username, password })
    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe('string');
})

test('newUserHasEmptyList', async()=>{
    const token = await getToken('user2', 'password2');
    const getBooks = await supertest(app).get('/me/books').set('Authorization', `Bearer ${token}`);
    expect(getBooks.status).toBe(200);
    expect(getBooks.body).toEqual([]);
})

test('addBookToMyListAndSeeIt', async()=>{
    const token = await getToken('user3', 'password3');
    const postBooks = await supertest(app).post('/books').set('Authorization', `Bearer ${token}`).send({title: 'test', author: 'test'});
    expect(postBooks.status).toBe(201);
    const bookId = postBooks.body._id;
    const postBooksInList = await supertest(app).post(`/me/books/${bookId}`).set('Authorization', `Bearer ${token}`);
    expect(postBooksInList.status).toBe(201);
    const list = await supertest(app).get('/me/books').set('Authorization', `Bearer ${token}`);
    expect(list.body).toHaveLength(1);
    expect(list.body[0].book.title).toBe('test');
})

test('cantDeleteNotYourBook', async()=>{
    const tokenA = await getToken('user5', 'password5');
    const postBooks = await supertest(app).post('/books').set('Authorization', `Bearer ${tokenA}`).send({title: 'test', author: 'test'});
    expect(postBooks.status).toBe(201);
    const bookId = postBooks.body._id;
    const postBooksInList = await supertest(app).post(`/me/books/${bookId}`).set('Authorization', `Bearer ${tokenA}`);
    expect(postBooksInList.status).toBe(201);

    const tokenB = await getToken('user6', 'password6');
    const tryToDelete = await supertest(app).delete(`/me/books/${bookId}`).set('Authorization', `Bearer ${tokenB}`);
    expect(tryToDelete.status).toBe(404);
    const listA = await supertest(app).get('/me/books').set('Authorization', `Bearer ${tokenA}`);
    expect(listA.body).toHaveLength(1);

})