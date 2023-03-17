import { MongoClient } from 'mongodb';
import mongodb from 'mongodb';
import express from 'express';
import cors from 'cors';

const ObjectID = mongodb.ObjectId;
const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

const url = 'mongodb+srv://IgorGabriel:Teste123@cluster0.jhwziuy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

async function start() {
    try {
        await client.connect();
        console.log('Conexão com o servidor MongoDB estabelecida com sucesso!');
    } catch (err) {
        console.log('Não foi possível conectar ao servidor MongoDB', err);
    }

    const db = client.db('DbTeste');
    const collection = db.collection('AmigoSecreto');

    app.get('/search', async (req, res) => {
        try {
            const documents = await collection.find().toArray();
            res.json(documents);
        } catch (err) {
        }
    });

    app.post('/cad', async (req, res) => {
        let name = req.body.name;
        let email = req.body.email;

        let document = { name: `${name}`, email: `${email}` };

        try {
            const result = await collection.insertOne(document);
            console.log('Documento inserido com sucesso!');
            res.json(result.ops[0]);
        } catch (err) {
        }
    });

    app.put('/put/:id', async (req, res) => {
        console.log('testando aqui')
        const collection = client.db('DbTeste').collection('AmigoSecreto');
        const id = req.params.id;

        const filter = { _id: new ObjectID(id) };
        const updateDoc = { $set: req.body };

        try {
            const result = await collection.updateOne(filter, updateDoc);

            if (result.modifiedCount === 1) {
                res.send('Documento atualizado com sucesso');
            } else {
                res.status(404).send('Documento não encontrado');
            }
        } catch (err) {
        }
    });

    app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const result = await collection.deleteOne({ _id: new ObjectID(id) });
            if (result.deletedCount === 0) {
                res.status(404).send('Documento não encontrado');
            } else {
                res.send('Documento removido com sucesso!');
            }
        } catch (err) {
            console.log(err)
        }
    });

    app.listen(port, () => {
        console.log(`Servidor iniciado na porta ${port}`);
    });
}

start();