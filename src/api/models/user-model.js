const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3602,
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jame@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3610,
    name: 'Alice Smith',
    username: 'alicesmith',
    email: 'alice@metropolia.fi',
    role: 'admin',
    password: 'adminpassword',
  },
  {
    user_id: 3611,
    name: 'Bob Johnson',
    username: 'bobjohnson',
    email: 'bob@metropolia.fi',
    role: 'user',
    password: 'securepassword',
  },
];

const listAllusers = () => {
  return userItems;
};

const finduserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const adduser = (user) => {
  const {user_name, weight, owner, filename, birthdate} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    user_id: newId,
    user_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return {user_id: newId};
};
const deleteuser = (id) => {
  const index = userItems.findIndex((item) => item.user_id === id);
  if (index !== -1) {
    userItems.splice(index, 1);
    return true;
  }
  return false;
};

export {listAllusers, finduserById, adduser, deleteuser};
