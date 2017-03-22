const { compose, createStore } = require('redux')
const { persistStore, autoRehydrate } = require('redux-persist')
const createMigration = require('redux-persist-migrate')
const assign = require('lodash.assign')
const omit = require('lodash.omit')

const INCREMENT = 'INCREMENT'
const APP = 'app'

const defaultState = { [APP]: {}, number: 0 }

// This reducer is for set up purposes
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case INCREMENT: return assign({
      number: state.number + 1
    }, state)

    default: return state
  }
}

// The manifest set the larger version number (you can place multiples; like a history)
// And return the corresponding state for each version
// To follow the example execute (reload the html) the code, UNCOMENT here the
// NEXT step and execute again; one step at a time so you can see how evolves.

// This empty (all commented) manifest represents a non-versioned persisted store.
// You'll see that there's no version key inside `state.app`
const manifest = {
  // Set the version to 1 and do nothing with the state
  // Reloading many times won't change nothing til a higher version is added
  // to the manifest. Try to uncomment the line below to start versioning.
  // 1: (state) => state,

  // Set the version to 2 and add a new value called `expand` to `state.app`
  // 2: (state) => assign({}, state, {
  //   app: assign({ expand: 'state' }, state.app)
  // }),

  // Set the version to 4 and remove `state.app`
  // You can skip versions, the manifest will always go for the higher
  // 4: (state) => assign({}, state, {
  //   app: omit(state.app, 'expand')
  // }),
}

// Here comes de migrations declaration
const migration = createMigration.default(
  manifest, // receipe
  APP // store key holding the version number
)

const store = createStore(reducer, defaultState, compose(migration, autoRehydrate()))

persistStore(store, {}, () => {
  // increment by one for set up purposes
  store.dispatch({ type: INCREMENT })

  console.log('Store is persisted at localStorage! Here is the current state:')
  console.log(store.getState())
})// .purge() // Flush the persistor to try again from the begining
