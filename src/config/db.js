import Dexie from "dexie";

export const db = new Dexie("kwikpic");
db.version(1).stores({
  images: "++id, name, file, size, type",
});
