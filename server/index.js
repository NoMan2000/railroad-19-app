import path from 'path';
import express from 'express';
import {ServerData} from './db/ServerData.model';

const app = express();
const publicPath = path.join(__dirname, '..', 'dist');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.post('/data', async (req, res) => {
  const {data} = req.body;
  const resolvedData = await ServerData.create(data);
  res.send(resolvedData);
});

app.delete('/data', async (req, res) => {
  const {data} = req.body;
  await ServerData.destroy({
    where: {
      ...data
    }
  });
  res.send();
});

app.get("/data", async (req, res) => {
  const data = await ServerData.findAll();
  res.send(data);
});

const updateData = async (req, res) => {
  const {data} = req.body;
  const {id} = req.params;
  const result = await ServerData.update(data, {
    where: {
      id
    }
  });
  res.send(result);
};

app.put('/data/:id', updateData);
app.patch('/data/:id', updateData);


app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
  console.log('Server is up!', publicPath);
});
