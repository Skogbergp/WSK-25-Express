import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(
    'SELECT wsk_cats.*,wsk_users.name as "owner" FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id'
  );
  console.log('rows', rows);
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
    const {cat_name, weight, owner, birthdate} = cat;
    const filename = cat.filename || null;

    const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
    const params = [cat_name, weight, owner, filename, birthdate];
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

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE WSK_cats SET ? WHERE cat_id = ?`, [
    cat,
    id,
  ]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_rcats WHERE cat_id = ?',
    [id]
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
