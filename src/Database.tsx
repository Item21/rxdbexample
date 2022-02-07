import {
    createRxDatabase,
    addPouchPlugin,
    addRxPlugin,
    getRxStoragePouch,
    RxDatabase
} from 'rxdb'

import { issueSchema } from './IssueSchema'

import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'
import { RxDBReplicationCouchDBPlugin } from 'rxdb/plugins/replication-couchdb'

addPouchPlugin(require('pouchdb-adapter-idb'))
addPouchPlugin(require('pouchdb-adapter-http')) // enable syncing over http
addRxPlugin(RxDBLeaderElectionPlugin)
addRxPlugin(RxDBReplicationCouchDBPlugin)
//10102
const syncURL = 'http://' + window.location.hostname + ':' + process.env.PORT || 10102 + '/';
console.log('host: ' + syncURL);

let dbPromise: Promise<RxDatabase> | null = null;

const createDatabase = async () => {
    console.log('DatabaseService: creating database..')
    const db = await createRxDatabase({
        name: 'issuesreactdb',
        storage: getRxStoragePouch('idb')
    })

    console.log('DatabaseService: created database')
    window['db'] = db

    db.waitForLeadership().then(() => {
        console.log('isLeader now')
        document.title = '♛ ' + document.title
    })

    //create collection
    await db.addCollections({
        issues: {
            schema: issueSchema,
            methods: {
                fullIssue() {
                    return this.title + "" + this.description;
                }
            },
            autoMigrate: true
        }
    })
    
    // hooks
    console.log('DatabaseService: add hooks')
    db.collections.issues.preInsert(async issue => {
        const { title } = issue
        console.log("HERE", title)
        const has = await db.collections.issues.findOne({
            selector: { title }
        }).exec()

        console.log(has)
        if (has !== null)
            console.error('another issue already has this title ' + title);

        return db
    }, false)

    //sync
    console.log('DatabaseService: sync')
    Object.values(db.collections).map(col => col.name).map(colName => db[colName].syncCouchDB({
        remote: syncURL + colName + '/'
    }))

    return db
}


export const get = () => {
    if (!dbPromise)
        dbPromise = createDatabase();
    return dbPromise;
};