import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  try {
    const {name, username, email, role, password} = user;
    console.log(user);
    const sql = `INSERT INTO wsk_users (name, username, email, role, password)
                 VALUES (?, ?, ?, ?, ?)`;
    const params = [name, username, email, role, password];
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
    if (rows[0].affectedRows === 0) {
      return false;
    }
    return {user_id: rows[0].insertId};
  } catch (error) {
    console.error('Error adding user:', error);
    return 'Error adding user';
  }
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    connection.beginTransaction();

    await connection.execute('DELETE FROM wsk_cats WHERE user_id = ?', [id]);

    const sql = await connection.format(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );

    const [rows] = await connection.execute(sql);
    console.log('rows', rows);

    if (rows.affectedRows === 0) {
      return 'user not deleted';
    }
    console.log('committing');
    await connection.commit();
    return {message: 'success'};
  } catch (error) {
    console.error('Error deleting user:', error);
    await connection.rollback();
    return 'Error deleting user';
  } finally {
    connection.release();
  }
};

const login = async (user) => {
  try {
    const sql = `SELECT *
                FROM wsk_users
                WHERE username = ?`;
    const params = [user];

    const [rows] = await promisePool.execute(sql, params);

    return rows[0];
  } catch (error) {
    console.error('Error logging in user:', error);
    return 'Error logging in user';
  }
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser, login};
