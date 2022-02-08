import { Pool } from "pg";

const connectionString = "postgres://syqaveyv:PDrCF-B4_iS-mU3CgePXelbzT994N19A@kesavan.db.elephantsql.com/syqaveyv";
const db = new Pool({ connectionString });

export default db;