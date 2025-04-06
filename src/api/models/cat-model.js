import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(
    'SELECT wsk_cats.*,wsk_users.name as "owner" FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id'
  );
  // console.log('rows', rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT wsk_cats.*, wsk_users.name as "owner" FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id WHERE wsk_cats.cat_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat) => {
  try {
    const {cat_name, weight, owner, birthdate, filename} = cat;
    console.log('cat_name:', cat_name);
    console.log('weight:', weight);
    console.log('owner:', owner);
    console.log('birthdate:', birthdate);
    console.log('filename:', filename);
    const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
                 VALUES (?, ?, ?, ?, ?)`;
    const params = [
      cat_name,
      weight,
      owner,
      filename || null, // Use null if filename is undefined
      birthdate,
    ];

    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
    if (rows[0].affectedRows === 0) {
      return false;
    }
    return {cat_id: rows[0].insertId};
  } catch (error) {
    console.error('Error adding cat:', error);
    return 'Error adding cat';
  }
};

const modifyCat = async (cat, user) => {
  console.log('cat', cat);
  console.log('user', user);

  const newCat = {
    cat_name: cat.updated_cat_name,
    weight: cat.weight,
    filename: cat.filename || '',
    birthdate: cat.birthdate,
  };
  const id = user.user_id;
  const sql = promisePool.format(
    `UPDATE wsk_cats SET ? WHERE cat_name = ? AND owner = ?`,
    [newCat, cat.cat_name, id]
  );

  console.log('SQL Query:', sql);
  console.log('cat:', cat);
  console.log('cat.cat_name:', cat.cat_name);
  console.log('user.user_id:', id);

  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return {message: 'Cat not found or not updated'};
  }
  return {message: 'cat updated'};
};

const removeCat = async (id, user_id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_rcats WHERE cat_id = ? AND owner = ?',
    [id, user_id]
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const findCatByUserId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

export {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  findCatByUserId,
};
