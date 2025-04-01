// mock data
const catItems = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
];

const listAllCats = () => {
  return catItems;
};

const findCatById = (id) => {
  return catItems.find((item) => item.cat_id === id);
};

const addCat = (cat) => {
  console.log(cat);
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const newId =
    catItems.length > 0
      ? Math.max(...catItems.map((item) => item.cat_id)) + 1
      : 1;
  catItems.push({
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  console.log('New cat added:', catItems[catItems.length - 1]);
  return {cat_id: newId};
};
const deleteCat = (id) => {
  const index = catItems.findIndex((item) => item.cat_id === id);
  if (index !== -1) {
    catItems.splice(index, 1);
    return true;
  }
  return false;
};

export {listAllCats, findCatById, addCat, deleteCat};
