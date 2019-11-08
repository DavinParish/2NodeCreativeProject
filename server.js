const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

let categories = [];
let id = 0;

app.post('/api/categories', (req, res) => {
  id = id + 1;
  let category = {
    id: id,
    categoryName: req.body.categoryName,
    allotment: req.body.allotment
  };
  categories.push(category);
  res.send(category);
});

app.get('/api/categories', (req, res) => {
  res.send(categories);
});

app.put('/api/categories/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let categoriesMap = categories.map(category => {
    return category.id;
  });
  let index = categoriesMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  let item = categories[index];
  item.categoryName = req.body.categoryName;
  item.allotment = req.body.allotment;
  res.send(item);
});

app.delete('/api/categories/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = categories.map(item => {
      return item.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  categories.splice(removeIndex, 1);
  res.sendStatus(200);
});
app.listen(3000, () => console.log('Server listening on port 3000!'));
