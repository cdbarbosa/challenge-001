import fs from 'node:fs/promises';

const path = new URL('db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(path, 'utf8').then(data => {
      this.#database = JSON.parse(data);
    }).catch(() => this.#persist())
  }

  #persist() {
    fs.writeFile(path, JSON.stringify(this.#database))
  }

  create(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  list(table) {
    return this.#database[table] ?? [];
  }
}