import { createSlice } from '@reduxjs/toolkit';
import { PlayerModel, DetailModel } from '../models/player.model';
import { StepsNight } from '../Data';
import { TimeModel } from '../models/time.model';

const wereWolfSlice = createSlice({
    name: 'wereWolf',
    initialState: {
        players: [],
        playersWithRole: [],
        steps: [],
        currentStep: {},
        day: 1,
        bodyguard: 0,
        details: [],
        couple: [],
        Daytimer: [],
    },
    reducers: {
        setCurrentStep: (state, { payload }) => {
            const title = `${state.day}.${state.currentStep.type}.${state.currentStep.name}`.trim();
            const detail = state.details.find((d) => {
                return d.id === title;
            });

            if (detail) {
                if (detail.coupleByCupid.length > 0) {
                    state.couple = detail.coupleByCupid;
                }
                if (detail.helpByGuard.length > 0) {
                    state.bodyguard = detail.helpByGuard[0];
                }
                if (detail.helpByWitch.length > 0) {
                    let _playersWithRole = [];
                    const player = state.playersWithRole.find((p) => p.id === parseInt(detail.helpByWitch[0]));
                    if (player.rule === 10) {
                        const a = state.details.find((d) => {
                            return d.id === `${state.day}.${state.currentStep.type}.wolf`.trim();
                        });
                        debugger;
                        _playersWithRole = state.playersWithRole.map((e) => {
                            if (e.id !== parseInt(a.killByHunter[0])) {
                                return e;
                            } else {
                                return { ...e, lives: e.lives + 2 };
                            }
                        });
                    }
                    _playersWithRole = _playersWithRole.map((e) => {
                        if (e.id !== parseInt(detail.helpByWitch[0])) {
                            return e;
                        } else {
                            return { ...e, lives: e.lives + 1 };
                        }
                    });

                    _playersWithRole.sort((a, b) => b.lives - a.lives);
                    state.playersWithRole = _playersWithRole;
                }
                if (detail.killBywolf.length > 0) {
                    let _playersWithRole = [];
                    detail.killBywolf.map((id) => {
                        _playersWithRole = state.playersWithRole.map((e) => {
                            if (e.id !== parseInt(id)) {
                                return e;
                            } else if (state.bodyguard === parseInt(id) && state.currentStep.type === 2) {
                                const player = state.playersWithRole.find((p) => p.id === parseInt(state.bodyguard));
                                state.bodyguard = 0;
                                if (player.rule === 10) {
                                    state.details = state.details.map((d) => {
                                        if (d.id !== `${state.day}.${state.currentStep.type}.${state.currentStep.name}`.trim()) {
                                            return d;
                                        } else {
                                            detail.killByHunter = [];
                                            return { ...d, killByHunter: [] };
                                        }
                                    });
                                    return e;
                                }
                                return e;
                            } else {
                                return { ...e, lives: e.lives - 1 };
                            }
                        });
                        return 0;
                    });
                    _playersWithRole.sort((a, b) => b.lives - a.lives);
                    state.playersWithRole = _playersWithRole;
                }
                const ids = [...detail.killBywitch, ...detail.killByHunter, ...detail.killByagree];
                if (ids.length > 0) {
                    let _playersWithRole = [];
                    ids.map((id) => {
                        _playersWithRole = state.playersWithRole.map((e) => {
                            if (e.id !== parseInt(id)) {
                                return e;
                            } else if (state.bodyguard === parseInt(id) && state.currentStep.type === 2) {
                                state.bodyguard = 0;
                                const player = state.playersWithRole.find((p) => p.id === parseInt(state.bodyguard));
                                if (player.rule === 10) {
                                    state.details = state.details.map((d) => {
                                        if (d.id !== `${state.day}.${state.currentStep.type}.${state.currentStep.name}`.trim()) {
                                            return d;
                                        } else {
                                            return { ...d, killByHunter: [] };
                                        }
                                    });
                                    return 0;
                                }
                                return e;
                            } else {
                                return { ...e, lives: e.lives - 2 };
                            }
                        });
                        return 0;
                    });
                    _playersWithRole.sort((a, b) => b.lives - a.lives);
                    state.playersWithRole = _playersWithRole;
                }
            }
            state.currentStep = payload;
            debugger;
            const a = new DetailModel({ id: `${state.day}.${state.currentStep.type}.${state.currentStep.name}`.trim() });
            if (state.currentStep.actions) {
                state.details = [...state.details, a];
            }
            if (payload.name === 'endday') {
                state.day = state.day + 1;
                state.steps = state.steps.filter((step) => !step.isFirst);
                state.bodyguard = 0;
            }
        },
        reset: (state) => {
            const { day, currentStep, details } = state;
            state.details = details.map((d) => {
                if (d.id !== `${day}.${currentStep.type}.${currentStep.name}`.trim()) {
                    return d;
                } else {
                    const a = new DetailModel({ id: `${day}.${currentStep.type}.${currentStep.name}`.trim() });
                    return a;
                }
            });
        },
        setPlayers: (state, { payload }) => {
            const players = payload.map((e) => new PlayerModel(e));
            players.sort((a, b) => a.lives - b.lives);
            state.playersWithRole = players;
        },
        doAction: (state, { payload }) => {
            const { id, action } = payload;
            const { day, currentStep, details } = state;
            state.details = details.map((d) => {
                if (d.id !== `${day}.${currentStep.type}.${currentStep.name}`.trim()) {
                    return d;
                } else {
                    return { ...d, [action.trim()]: [...d[action.trim()], id] };
                }
            });
        },
        setPlayerDefault: (state, { payload }) => {
            state.players = payload;
        },
        addPlayerDefault: (state, { payload }) => {
            const { players } = state;
            const newArray = [...players, payload];
            state.players = newArray;
        },
        setDayTimerDefault: (state, { payload }) => {
            const timers = payload.map((e) => new TimeModel(e));
            state.Daytimer = timers;
        },

        setSteps: (state, { payload }) => {
            if (payload) {
                state.steps = [
                    ...StepsNight,
                    ...state.Daytimer,
                    {
                        type: 1,
                        name: 'endday',
                        title: 'Chuẩn bị cho ngày mới',
                        time: 0,
                    },
                ];
            } else {
                state.steps = [
                    ...state.Daytimer,
                    ...StepsNight,
                    {
                        type: 1,
                        name: 'endday',
                        title: 'Chuẩn bị cho ngày mới',
                        time: 0,
                    },
                ];
            }
        },
    },
});
export const wereWolfSelector = {
    currentStep: (state) => state['wereWolf'].currentStep,
    players: (state) => state['wereWolf'].players,
    playersWithRole: (state) => state['wereWolf'].playersWithRole,
    steps: (state) => state['wereWolf'].steps,
    details: (state) => state['wereWolf'].details,
    bodyguard: (state) => state['wereWolf'].bodyguard,
    day: (state) => state['wereWolf'].day,
    dayTimer: (state) => state['wereWolf'].Daytimer,
};
export const wereWolfActions = wereWolfSlice.actions;
export default wereWolfSlice.reducer;
