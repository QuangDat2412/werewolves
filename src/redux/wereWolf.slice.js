import { createSlice } from '@reduxjs/toolkit';
import { StepModel } from '../models/step.model';
import { PlayerModel } from '../models/player.model';
import { DetailModel } from '../models/detail.model';
import { StepsNight } from '../Data';

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
        oldManLive: true,
        youngStrongMan: 0,
        hunter: [],
        died: [],
        diseased: 0,
    },
    reducers: {
        setCurrentStep: (state, { payload }) => {
            state.currentStep = payload;
            let _playersWithRole = state.playersWithRole;
            const model = new DetailModel({ day: state.day, type: state.currentStep.type, name: state.currentStep.name });
            state.details = [...state.details, model];
            if (payload.name === 'startday') {
                state.day = state.day + 1;
                state.steps = state.steps.filter((step) => !step.isFirst);
                state.bodyguard = 0;
                state.hunter = [];
            }
            if (state.youngStrongMan !== 0 && state.youngStrongMan + 1 === state.day) {
                const youngStrongMan = state.playersWithRole.find((p) => p.rule === 9) || {};

                _playersWithRole = _playersWithRole.map((e) => {
                    if (e.id !== youngStrongMan.id) {
                        return e;
                    } else {
                        state.died = [
                            ...state.died,
                            {
                                day: state.day,
                                type: state.currentStep.type,
                                id: e.id,
                                name: 'wolfKillYoungStrongMan',
                                message: `bị sói cắn đêm thứ ${state.day - 1} và chết vào đêm thứ ${state.day}`,
                            },
                        ];
                        return { ...e, lives: e.lives - 1 };
                    }
                });
                state.youngStrongMan = 0;
            }
            _playersWithRole.sort((a, b) => b.lives - a.lives);

            state.playersWithRole = _playersWithRole;
        },
        doActionSuccess: (state) => {
            const title = `${state.day}.${state.currentStep.type}.${state.currentStep.name}`.trim();
            const detail = state.details.find((d) => {
                return d.id === title;
            });
            let _playersWithRole = state.playersWithRole;

            const youngStrongMan = _playersWithRole.find((p) => p.rule === 9) || {};
            const hunter = _playersWithRole.find((p) => p.rule === 10) || {};
            const oldMan = _playersWithRole.find((p) => p.rule === 11) || {};
            const diseased = _playersWithRole.find((p) => p.rule === 14) || {};

            if (detail) {
                if (detail.coupleByCupid?.length > 0) {
                    state.couple = detail.coupleByCupid;
                }
                if (detail.selectByhunter?.length > 0) {
                    state.hunter = [detail.selectByhunter[0], hunter.id];
                }
                if (detail.helpByGuard?.length > 0) {
                    state.bodyguard = detail.helpByGuard[0];
                }
                if (detail.helpByWitch?.length > 0) {
                    _playersWithRole = _playersWithRole.map((e) => {
                        if (e.id !== detail.helpByWitch[0]) {
                            return e;
                        } else if (youngStrongMan.id === detail.helpByWitch[0]) {
                            state.youngStrongMan = 0;
                            return e;
                        } else if (oldMan.id === detail.helpByWitch[0] && oldMan.lives === 2) {
                            return e;
                        } else {
                            return { ...e, lives: e.lives + 1 };
                        }
                    });
                    state.steps = state.steps.map((s) => {
                        if (s.name === 'witch') {
                            return { ...s, help: s.help - 1 };
                        } else {
                            return s;
                        }
                    });
                    if (state.couple.find((c) => c === detail.helpByWitch[0])) {
                        state.couple.map((id) => {
                            _playersWithRole = _playersWithRole.map((e) => {
                                if (e.id !== id) {
                                    return e;
                                } else if (e.lives < 1) {
                                    state.died = state.died.filter((d) => {
                                        return !(
                                            d.day === state.day &&
                                            d.type === state.currentStep.type &&
                                            d.id === e.id &&
                                            d.name === 'killCouple'
                                        );
                                    });
                                    return { ...e, lives: e.lives + 2 };
                                } else {
                                    return e;
                                }
                            });
                            return 0;
                        });
                    }

                    state.died = state.died.filter((d) => {
                        return !(
                            d.day === state.day &&
                            d.type === state.currentStep.type &&
                            d.id === detail.helpByWitch[0] &&
                            d.name === 'killBywolf'
                        );
                    });
                }
                if (detail.killBywolf?.length > 0) {
                    detail.killBywolf.map((id) => {
                        _playersWithRole = _playersWithRole.map((e) => {
                            if (e.id !== id) {
                                return e;
                            } else if (state.bodyguard === id) {
                                state.bodyguard = 0;
                                return e;
                            } else if (id === youngStrongMan.id) {
                                state.youngStrongMan = state.day;
                                return e;
                            } else if (id === oldMan.id && oldMan.lives === 2) {
                                return { ...e, lives: e.lives - 1 };
                            } else {
                                state.died = [
                                    ...state.died,
                                    {
                                        day: state.day,
                                        type: state.currentStep.type,
                                        id: e.id,
                                        name: 'killBywolf',
                                        message: 'đã chết vì bị sói cắn chết',
                                    },
                                ];
                                return { ...e, lives: e.lives - 1 };
                            }
                        });
                        if (state.couple.find((c) => c.id === id)) {
                            state.details = state.details.map((d) => {
                                if (d.id !== `${state.day}.${state.currentStep.type}.${state.currentStep.name}`.trim()) {
                                    return d;
                                } else {
                                    const die = _playersWithRole.find((p) => p.id === state.couple[0]).lives < 1;
                                    if (die) {
                                        return { ...d, killCouple: [state.couple[1]] };
                                    } else {
                                        return { ...d, killCouple: [state.couple[0]] };
                                    }
                                }
                            });
                            state.couple.map((id) => {
                                _playersWithRole = _playersWithRole.map((e) => {
                                    if (e.id !== id) {
                                        return e;
                                    } else if (e.lives > 0) {
                                        state.died = [
                                            ...state.died,
                                            {
                                                day: state.day,
                                                type: state.currentStep.type,
                                                id: e.id,
                                                name: 'killCouple',
                                                message: 'đã chết vì người yêu bị giết',
                                            },
                                        ];
                                        return { ...e, lives: e.lives - 2 };
                                    } else {
                                        return e;
                                    }
                                });
                                return 0;
                            });
                        }
                        if (diseased.id === id) {
                            state.diseased = state.day;
                        }
                        return 0;
                    });
                }
                const ids = [...detail.killBywitch, ...detail.killByAgree];
                if (ids?.length > 0) {
                    if (detail.killBywitch?.length > 0) {
                        state.steps = state.steps.map((s) => {
                            if (s.name === 'witch') {
                                return { ...s, kill: s.kill - 1 };
                            } else {
                                return s;
                            }
                        });
                        state.died = [
                            ...state.died,
                            {
                                day: state.day,
                                type: state.currentStep.type,
                                id: detail.killBywitch[0],
                                name: 'killBywitch',
                                message: 'đã chết vì bị phù thủy giết',
                            },
                        ];
                    }
                    if (detail.killByAgree?.length > 0) {
                        state.died = [
                            ...state.died,
                            {
                                day: state.day,
                                type: state.currentStep.type,
                                id: detail.killByAgree[0],
                                name: 'killByAgree',
                                message: 'đã chết vì bị dân làng treo cổ',
                            },
                        ];
                    }
                    ids.map((id) => {
                        _playersWithRole = _playersWithRole.map((e) => {
                            if (e.id !== id) {
                                return e;
                            } else {
                                return { ...e, lives: e.lives - 2 };
                            }
                        });
                        if (state.couple.find((c) => c.id === id)) {
                            state.details = state.details.map((d) => {
                                if (d.id !== `${state.day}.${state.currentStep.type}.${state.currentStep.name}`.trim()) {
                                    return d;
                                } else {
                                    const die = _playersWithRole.find((p) => p.id === state.couple[0]).lives < 1;
                                    if (die) {
                                        return { ...d, killCouple: [state.couple[1]] };
                                    } else {
                                        return { ...d, killCouple: [state.couple[0]] };
                                    }
                                }
                            });
                            state.couple.map((id) => {
                                _playersWithRole = _playersWithRole.map((e) => {
                                    if (e.id !== id) {
                                        return e;
                                    } else if (e.lives > 0) {
                                        state.died = [
                                            ...state.died,
                                            {
                                                day: state.day,
                                                type: state.currentStep.type,
                                                id: e.id,
                                                name: 'killCouple',
                                                message: 'đã chết vì người yêu bị giết',
                                            },
                                        ];
                                        return { ...e, lives: e.lives - 2 };
                                    } else {
                                        return e;
                                    }
                                });
                                return 0;
                            });
                        }
                        return 0;
                    });
                }

                const gialang = _playersWithRole.find((p) => p.rule === 11) || {};
                if (gialang.lives < 1) {
                    state.oldManLive = false;
                } else {
                    state.oldManLive = true;
                }

                if (state.hunter?.length === 2 && state.currentStep.type === 2) {
                    const checkHunterDie = _playersWithRole.find((p) => p.id === state.hunter[1]).lives < 1;
                    if (checkHunterDie) {
                        _playersWithRole = _playersWithRole.map((e) => {
                            if (e.id !== state.hunter[0]) {
                                return e;
                            } else if (e.lives > 0) {
                                state.details = state.details.map((d) => {
                                    if (d.id !== `${state.day}.${state.currentStep.type}.${state.currentStep.name}`.trim()) {
                                        return d;
                                    } else {
                                        return { ...d, killByhunter: [state.hunter[0]] };
                                    }
                                });
                                state.died = [
                                    ...state.died,
                                    {
                                        day: state.day,
                                        type: state.currentStep.type,
                                        id: e.id,
                                        name: 'killByhunter',
                                        message: 'đã chết vì bị thợ săn bắn chết',
                                    },
                                ];

                                return { ...e, lives: e.lives - 2 };
                            } else {
                                return e;
                            }
                        });
                        const checkCoupleDie = state.couple.reduce((p, c) => {
                            const x = _playersWithRole.find((p) => p.id === c);
                            return p || x.lives < 1;
                        }, false);
                        if (checkCoupleDie) {
                            state.details = state.details.map((d) => {
                                if (d.id !== `${state.day}.${state.currentStep.type}.${state.currentStep.name}`.trim()) {
                                    return d;
                                } else {
                                    const die = _playersWithRole.find((p) => p.id === state.couple[0]).lives < 1;
                                    if (die) {
                                        return { ...d, killCouple: [state.couple[1]] };
                                    } else {
                                        return { ...d, killCouple: [state.couple[0]] };
                                    }
                                }
                            });
                            state.couple.map((id) => {
                                _playersWithRole = _playersWithRole.map((e) => {
                                    if (e.id !== id) {
                                        return e;
                                    } else if (e.lives > 0) {
                                        state.died = [
                                            ...state.died,
                                            {
                                                day: state.day,
                                                type: state.currentStep.type,
                                                id: e.id,
                                                name: 'killCouple',
                                                message: 'đã chết vì người yêu bị giết',
                                            },
                                        ];
                                        return { ...e, lives: e.lives - 2 };
                                    } else {
                                        return e;
                                    }
                                });
                                return 0;
                            });
                        }
                    } else {
                        _playersWithRole = _playersWithRole.map((e) => {
                            if (e.id !== state.hunter[0]) {
                                return e;
                            } else if (e.lives < 1) {
                                state.died = state.died.filter((d) => {
                                    return !(d.day === state.day && d.type === state.currentStep.type && d.id === e.id && d.name === 'killByhunter');
                                });
                                return { ...e, lives: e.lives + 2 };
                            } else {
                                return e;
                            }
                        });
                        const _detail = state.details.find((d) => {
                            return d.id === `${state.day}.${state.currentStep.type}.wolf`.trim();
                        });
                        if (state.couple.find((c) => c === _detail?.killByhunter[0])) {
                            state.couple.map((id) => {
                                _playersWithRole = _playersWithRole.map((e) => {
                                    if (e.id !== id) {
                                        return e;
                                    } else if (e.lives < 1) {
                                        state.died = state.died.filter((d) => {
                                            return !(
                                                d.day === state.day &&
                                                d.type === state.currentStep.type &&
                                                d.id === e.id &&
                                                d.name === 'killCouple'
                                            );
                                        });
                                        return { ...e, lives: e.lives + 2 };
                                    } else {
                                        return e;
                                    }
                                });
                                return 0;
                            });
                        }
                    }
                }

                _playersWithRole.sort((a, b) => b.lives - a.lives);
                state.playersWithRole = _playersWithRole;
            }
        },
        resetStep: (state) => {
            const { day, currentStep, details } = state;
            state.details = details.map((d) => {
                if (d.id !== `${day}.${currentStep.type}.${currentStep.name}`.trim()) {
                    return d;
                } else {
                    const a = new DetailModel({ day: day, type: currentStep.type, name: currentStep.name });
                    return a;
                }
            });
        },

        resetGame: (state) => {
            state.oldManLive = true;
            state.youngStrongMan = 0;
            state.hunter = [];
            state.died = [];
            state.diseased = 0;
            state.details = [];
            state.day = 1;
            state.bodyguard = 0;
            state.playersWithRole = [];
            state.steps = [];
            state.currentStep = {};
            state.couple = [];
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
            const timers = payload.map((e) => new StepModel(e));
            state.Daytimer = timers;
        },

        setSteps: (state, { payload }) => {
            const _StepsNight = StepsNight.filter((s) => {
                const result = s.player.reduce((x, id) => {
                    return x || state.playersWithRole.find((p) => p.rule === id);
                }, false);
                return result;
            });
            if (payload) {
                state.steps = [
                    ..._StepsNight,
                    ...state.Daytimer,
                    {
                        type: 1,
                        name: 'startday',
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
                        name: 'startday',
                        title: 'Chuẩn bị cho ngày mới',
                        time: 0,
                        action: [],
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
    oldManLive: (state) => state['wereWolf'].oldManLive,
    dayTimer: (state) => state['wereWolf'].Daytimer,
    couple: (state) => state['wereWolf'].couple,
    hunter: (state) => state['wereWolf'].hunter,
    died: (state) => state['wereWolf'].died,
    diseased: (state) => state['wereWolf'].diseased,
};
export const wereWolfActions = wereWolfSlice.actions;
export default wereWolfSlice.reducer;
