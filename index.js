const { compose, applyMiddleware, createStore } = require('redux')
const { persistStore, autoRehydrate } = require('redux-persist')
const createMigration = require('redux-persist-migrate')
