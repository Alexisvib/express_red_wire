const connection = require("../connection");
const db = connection.promise();

const findAll = async (name = null, before = null, order = null) => {
  let query = "SELECT * from serie";
  const keyword = "%" + name + "%";
  const date = before + "-01-01";
  if (name && !before) {
    query += " WHERE name LIKE ?";
    query = order ? (query += " ORDER BY NAME " + order) : query;
    const result = await db.query(query, [keyword]);
    return result[0];
  } else if (!name && before) {
    query += " WHERE date_creation < ? ";
    query = order ? (query += " ORDER BY NAME " + order) : query;
    const result = await db.query(query, [date]);
    return result[0];
  } else if (name && before) {
    query += " WHERE name LIKE ? AND date_creation < ? ";
    query = order ? (query += " ORDER BY NAME " + order) : query;
    const result = await db.query(query, [keyword, date]);
    return result[0];
  }

  const result = await db.query(query);
  return result[0];
};

const findOneById = async (id) => {
  const query = "SELECT * from serie WHERE id = ?";
  const result = await db.query(query, [id]);
  return result[0];
};

const deleteById = async (id) => {
  const query = "DELETE from serie WHERE id = ?";
  const sql = await db.query(query, [id]);
  console.log(sql);
  if (sql[0].affectedRows === 0) {
    return null;
  }
  return sql[0];
};

const create = async (name, date_creation, seen, episode_number) => {
  const query =
    "INSERT INTO serie (name, date_creation, seen, episode_number) VALUES (?,?,?,?)";
  const sql = await db.query(query, [
    name,
    date_creation,
    seen,
    episode_number,
  ]);
  const result = sql[0];
  const insertId = result.insertId;

  return {
    insertId,
    name,
    date_creation: date_creation,
    seen,
    episode_number: episode_number,
  };
};

const patch = async (id, name, date_creation, seen, episode_number) => {
  const query =
    "UPDATE serie SET name= ?, date_creation = ?, seen = ?, episode_number = ? WHERE id = ?";
  const sql = await db.query(query, [
    name,
    date_creation,
    seen,
    episode_number,
    id,
  ]);
  if (sql[0].affectedRows === 0) {
    return null;
  }
  return { id, name, date_creation, seen, episode_number };
};

const pagination = async (limit = null, offset = null) => {
  const queryTotal = "SELECT COUNT(*) as total_result from serie";
  const sql = await db.query(queryTotal);
  const resultatTotal = sql[0][0];
  let result = {};
  if (limit && offset) {
    const query = "SELECT * from serie LIMIT " + limit + " OFFSET " + offset;
    result = await db.query(query, [limit, offset]);
  } else {
    const query = "SELECT * from serie";
    result = await db.query(query);
  }

  return {
    "nombre total de série": resultatTotal.total_result,
    résultat: result[0],
  };
};

module.exports = {
  findAll,
  findOneById,
  pagination,
  create,
  patch,
  deleteById,
};
