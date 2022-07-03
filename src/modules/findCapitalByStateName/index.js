import { states } from './states'

export const findCapitalByStateName = (state) => {
  const arrayStates = Object.entries(states)
  for (let index = 0; index < arrayStates.length; index++) {
    if (state === arrayStates[index][0]) {
      return arrayStates[index][1]
    }
  }
  return 'noStateFound'
}
