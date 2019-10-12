class FSM {
   /**
    * Creates new FSM instance.
    * @param config
    */
  constructor(config) {
    if (!config) {
      throw new Error('There is no config!');
    } else {
      this.config = config;
      this.state = config.initial;
      this.states = config.states;
      this.history = [this.state];
      this.undoHistory = [];
    }
  }

   /**
    * Returns active state.
    * @returns {String}
    */
  getState() {
    return this.state;
  }

   /**
    * Goes to specified state.
    * @param state
    */
  changeState(state) {
    if (state in this.states) {
      this.state = state;
      if (this.undoHistory.length === 0 ) {
        this.history.push(this.state);
      }
    } else {
      throw new Error("state isn't exist");
    }
  }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
  trigger(event) {
    if (event in this.config.states[this.state].transitions) {
      this.undoHistory.length = 0;
      this.changeState(this.config.states[this.state].transitions[event]);
    } else {
      throw new Error("event in current state isn't exist");
    }
  }

    /**
     * Resets FSM state to initial.
     */
  reset() {
    this.state = this.config.initial;
  }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
  getStates(event) {
    const array = [];
    if (event === undefined) {
      return Object.keys(this.config.states);
    }
    for (let state in this.states) {
      if ( this.states[state].transitions[event]){
        array.push(state);
      }
    }
    return array;
  }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
  undo() {
    if (this.history.length === 1) {
      return false;
    }
    const lastState = this.history.pop();
    this.undoHistory.push(lastState);
    this.changeState(this.history[this.history.length - 1]);
    return true;
  }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
  redo() {
    if (this.undoHistory.length === 0) {
      return false;
    }
    const lastUndo = this.undoHistory.pop();
    this.changeState(lastUndo);
    return true;
  }

    /**
     * Clears transition history
     */
  clearHistory() {
    this.history.length = 1;
    this.undoHistory.length = 0;
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
