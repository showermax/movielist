// import {WatchListType} from "../App";
// import {addWatchListAC, watchListReducer} from "./watchListReducer";
//
// let startState: WatchListType[]
// beforeEach(() => {
//     startState = [
//         {id: 'allFilms', title: 'Movies'},
//         {id: 'topRated', title: 'Top Rated Movies'},
//         {id: 'watchedFilms', title: 'Watched Movies'}
//     ]
// })
//
// test('should be add watchlist', () => {
//     let endState = watchListReducer(startState, addWatchListAC('newWatchListId'))
//
//     expect(endState.length).toBe(startState.length + 1)
//     expect(startState.length).toBe(3)
//     expect(endState[3].id).toBe('newWatchListId')
//     expect(startState.at(-1)).toEqual(endState.at(-2))
//     expect(endState[3].title).toBeDefined()
//     expect(endState[3].title).toBe("newList")
//
//
// })

export {}
test('test', () => {
    const a = 1
    const b = 2
    const c = 3

    expect(a).toBe(1);
    expect(b).toBe(2);
    //wrong toBe
    expect(c).toBe(2);
})