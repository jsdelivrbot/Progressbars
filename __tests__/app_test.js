import App from '../src/components/app';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {
    mount,
    shallow
} from 'enzyme';
import axios, {
    get
} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to Api
// arguments for reply are (status, data, headers)
mock.onGet('http://frontend-exercise.apps.staging.digital.gov.au/bars').reply(() => {

    const data = {
        buttons: [
            // The amount of buttons to display and what value they increment or
            // decrement the selected bar. Randomly generates between 4 and 6 buttons.
            10,
            38, -13, -18
        ],
        bars: [
            // The number of progress bars to display and their default values.
            // Randomly generates between 2 and 5 progress bars.
            62,
            45,
            62
        ]
    };

    return [200, data];
});

const ajax = axios.get('http://frontend-exercise.apps.staging.digital.gov.au/bars')
    .then(function(response) {
        return response;
    })
    .catch(function(error) {
        console.log(error);
    });

test('Test if component renders', (done) => {
    const component = renderer.create( <
        App / >
    );

    setTimeout(() => {
        let tree = component.toJSON();

        expect(tree).toMatchSnapshot();

        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        done();
    }, 1000)
});

test('Test title of the app', () => {
            const app = shallow( <App /> );
            expect(app.contains(<h1>Progress Bars Demo</h1>)).toBe(true);
            })


            test('Test API comsumed and state updated', (done) => {
                const wrapper = shallow( <App /> );

                expect(wrapper).toMatchSnapshot();

                setTimeout(() => {
                    expect(wrapper.state('bars'));
                    expect(wrapper.state('buttons'));
                    expect(wrapper.state('select'));
                    done();
                }, 1000)
            });

            test('Test correct number of bars rendered', (done) => {
                const wrapper = shallow( <App /> );

                expect(wrapper).toMatchSnapshot();

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper.find('.bar').length).toEqual(response.data.bars.length)
                        done();
                    });
                })
            });

            test('Test correct number of buttons rendered', (done) => {
                const wrapper = shallow( <App /> );

                expect(wrapper).toMatchSnapshot();

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper.find('.button').length).toEqual(response.data.buttons.length);
                        done();
                    });
                })
            });

            test('Test correct number of options rendered', (done) => {
                const wrapper = shallow( <App /> );

                expect(wrapper).toMatchSnapshot();

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper.find('.option').length).toEqual(response.data.bars.length);
                        done();
                    });
                })
            });

            /* Tests for bar 1 */

            test('Test select bar 1 and update correct total and width on button 1', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 0
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(0).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total - 18);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage - 18);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });

            test('Test select bar 1 and update correct total and width on button 2', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 0
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(1).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total - 13);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage - 13);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });

            test('Test select bar 1 and update correct total and width on button 3', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 0
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(2).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total + 10);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage + 10);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });


            test('Test select bar 1 and update correct total and width on button 4', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 0
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(3).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total + 38);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage + 38);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });

            /* Tests for bar 2 */
            test('Test select bar 2 and update correct total and width on button 1', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 1
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(0).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total - 18);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage - 18);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });

            test('Test select bar 2 and update correct total and width on button 2', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 1
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(1).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total - 13);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage - 13);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });

            test('Test select bar 2 and update correct total and width on button 3', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 1
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(2).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total + 10);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage + 10);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });


            test('Test select bar 2 and update correct total and width on button 4', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 1
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(3).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total + 38);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage + 38);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });

            /* tests for bar 3 */


            test('Test select bar 3 and update correct total and width on button 1', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 2
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(0).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total - 18);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage - 18);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });

            test('Test select bar 3 and update correct total and width on button 2', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 2
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(1).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total - 13);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage - 13);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });

            test('Test select bar 3 and update correct total and width on button 3', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 2
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(2).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total + 10);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage + 10);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });


            test('Test select bar 3 and update correct total and width on button 4', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                            target: {
                                value: 2
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;
                        const percentage = wrapper.state('bars')[select].percentage;

                        wrapper.find('.button').at(3).simulate('click');
                        expect(wrapper.state('bars')[select].total).toEqual(total + 38);
                        expect(wrapper.state('bars')[select].percentage).toEqual(percentage + 38);

                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                })
            });

            /* Test Bars less than 100 */

            test('Test select bar 1 check percentage/total not < 0 on negative total', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                        target: {
                                value: 0
                            }
                        });

                        const select = wrapper.state('select');

                        wrapper.instance().updateProgress = jest.fn();
                        wrapper.update();
                        wrapper.instance()._updateProgress(-100);

                        expect(wrapper.state('bars')[select].percentage).toEqual(0);
                        expect(wrapper.state('bars')[select].total).toEqual(0);

                        done();
                    });
                })
            });

            test('Test select bar 2 check percentage/total not < 0 on negative total', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                        target: {
                                value: 1
                            }
                        });

                        const select = wrapper.state('select');

                        wrapper.instance().updateProgress = jest.fn();
                        wrapper.update();
                        wrapper.instance()._updateProgress(-100);

                        expect(wrapper.state('bars')[select].percentage).toEqual(0);
                        expect(wrapper.state('bars')[select].total).toEqual(0);

                        done();
                    });
                })
            });

            test('Test select bar 3 check percentage/total not < 0 on negative total', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                        target: {
                                value: 2
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;

                        wrapper.instance().updateProgress = jest.fn();
                        wrapper.update();
                        wrapper.instance()._updateProgress(-100);

                        expect(wrapper.state('bars')[select].percentage).toEqual(0);
                        expect(wrapper.state('bars')[select].total).toEqual(0);

                        done();
                    });
                })
            });

            /* Test Bars over 100 */
            test('Test select bar 1 check percentage is not > 100, but total can be > 100', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                        target: {
                                value: 0
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;

                        wrapper.instance().updateProgress = jest.fn();
                        wrapper.update();
                        wrapper.instance()._updateProgress(100);

                        expect(wrapper.state('bars')[select].percentage).toEqual(100);
                        expect(wrapper.state('bars')[select].total).toEqual(total + 100);
                        done();
                    });
                })
            });

            test('Test select bar 2 check percentage is not > 100, but total can be > 100', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                        target: {
                                value: 1
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;

                        wrapper.instance().updateProgress = jest.fn();
                        wrapper.update();
                        wrapper.instance()._updateProgress(100);

                        expect(wrapper.state('bars')[select].percentage).toEqual(100);
                        expect(wrapper.state('bars')[select].total).toEqual(total + 100);
                        done();
                    });
                })
            });

            test('Test select bar 3 check percentage is not > 100, but total can be > 100', (done) => {
                const wrapper = shallow( <App /> );

                ajax.then((response) => {
                    setTimeout(() => {
                        expect(wrapper).toMatchSnapshot();
                        wrapper.find('.select').simulate('change', {
                        target: {
                                value: 2
                            }
                        });

                        const select = wrapper.state('select');
                        const total = wrapper.state('bars')[select].total;

                        wrapper.instance().updateProgress = jest.fn();
                        wrapper.update();
                        wrapper.instance()._updateProgress(100);

                        expect(wrapper.state('bars')[select].percentage).toEqual(100);
                        expect(wrapper.state('bars')[select].total).toEqual(total + 100);
                        done();
                    });
                })
            });
