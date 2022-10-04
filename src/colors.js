const fillShades = require('./fill-shades')

module.exports = {
    slate: fillShades({
        5: '141e2b',
        10: '19212d',
        20: '262f3e',
        30: '323e52',
        40: '475063',
        50: '646a7d',
        60: '989daa',
        70: 'a6abb8',
        80: 'd8dae0',
        95: 'f6f7f8'
    }),
    gray: fillShades({
        5: '1e1d1f', // 16.6
        10: '212022', // 16.2
        20: '2f2e30', // 13.5
        30: '3e3d40', // 10.8
        40: '504f52', // 8.1
        50: '6b6a6d', // 5.4
        60: '9e9da0', // 2.7
        70: 'abaaae',
        80: 'dad9db',
        95: 'f5f4f7'
    }),
    brown: fillShades({
        5: '271b15',
        10: '2b1e18',
        20: '3c2b22',
        30: '50382c',
        40: '694839',
        50: '8d604b',
        60: 'b79788',
        70: 'c1a598',
        80: 'e6d7d0',
        95: 'f8f3f1'
    }),
    orange: fillShades({
        5: '2e1907',
        10: '331b07',
        20: '47260b',
        30: '5d320e',
        40: '7a4111',
        50: 'a15717',
        60: 'e38739',
        70: 'e79855',
        80: 'f5d4b7',
        95: 'fcf1e7'
    }),
    gold: fillShades({
        5: '281b00',
        10: '2d1e01',
        20: '3f2a00',
        30: '543800',
        40: '6d4900',
        50: '906000',
        60: 'd88f00',
        70: 'ea9b00',
        80: 'f6d696',
        95: 'fff3da'
    }),
    yellow: fillShades({
        5: '251d00',
        10: '282000',
        20: '3a2e01',
        30: '4b3b00',
        40: '624e00',
        50: '806700',
        60: 'be9900',
        70: 'd0a700',
        80: 'edda8f',
        95: 'fff5ca'
    }),
    grass: fillShades({
        5: '162106',
        10: '182406',
        20: '223308',
        30: '2c4408',
        40: '3a570b',
        50: '4e750e',
        60: '74ae15',
        70: '7dbc17',
        80: 'c8e49a',
        95: 'ebfad4'
    }),
    green: fillShades({
        5: '042311',
        10: '032611',
        20: '023717',
        30: '03481f',
        40: '025d26',
        50: '067b34',
        60: '09b64d',
        70: '0ac553',
        80: '99ecb3',
        95: 'e0fae8'
    }),
    beryl: fillShades({
        5: '002319',
        10: '00271c',
        20: '003626',
        30: '004732',
        40: '005c41',
        50: '007954',
        60: '00b37c',
        70: '00c387',
        80: '84eeca',
        95: 'd6fcef'
    }),
    teal: fillShades({
        5: '012220',
        10: '012624',
        20: '003532',
        30: '004541',
        40: '005a54',
        50: '00776f',
        60: '00b1a5',
        70: '00bfb2',
        80: '95e9e3',
        95: 'd4fcf8'
    }),
    cyan: fillShades({
        5: '00222b',
        10: '00252e',
        20: '013340',
        30: '004457',
        40: '00576f',
        50: '007391',
        60: '00abd7',
        70: '00b9e9',
        80: '9ee5f7',
        95: 'dff8ff'
    }),
    sky: fillShades({
        5: '031f34',
        10: '032339',
        20: '04314e',
        30: '044169',
        40: '065386',
        50: '086eb3',
        70: '4db3f7',
        60: '29a4f5',
        80: 'b4dffc',
        95: 'eaf6fe'
    }),
    blue: fillShades({
        5: '07194a',
        10: '081c53',
        20: '0a2773',
        30: '0e3496',
        40: '1146b6',
        50: '175fe9',
        60: '6b9ef1',
        70: '81acf3',
        80: 'c8dbfa',
        95: 'edf4fe'
    }),
    indigo: fillShades({
        5: '1f1645',
        10: '20174f',
        20: '2b1f74',
        30: '37289d',
        40: '463fb1',
        60: '9393f5',
        50: '5a5bd5',
        70: 'a1a5ee',
        80: 'd6d8f9',
        95: 'f1f2ff'
    }),
    violet: fillShades({
        5: '2b0a4e',
        10: '2e0b57',
        20: '3d1179',
        30: '4e169f',
        40: '5f2eba',
        50: '7949e5',
        60: 'ac8af8',
        70: 'b89bf9',
        80: 'e0d4fc',
        95: 'f5f1ff'
    }),
    purple: fillShades({
        5: '2e0c47',
        10: '330c4e',
        20: '460f6c',
        30: '5b1390',
        40: '7421b1',
        50: '9832e4',
        60: 'c184ef',
        70: 'ca96f1',
        80: 'e8d1fa',
        95: 'f9f0ff'
    }),
    fuchsia: fillShades({
        5: '39092a',
        10: '400932',
        20: '560d4a',
        30: '6f1165',
        40: '8c158a',
        50: 'b61cbb',
        60: 'e66ee9',
        70: 'ea86ed',
        80: 'f7ccf8',
        95: 'feefff'
    }),
    pink: fillShades({
        5: '3d0722',
        10: '430725',
        20: '5d0933',
        30: '790d44',
        40: '9a1058',
        50: 'ca1473',
        60: 'f170b4',
        70: 'f388c0',
        80: 'fbcfe6',
        95: 'fff0f8'
    }),
    crimson: fillShades({
        5: '430213',
        10: '470314',
        20: '62041c',
        30: '800524',
        40: '9f1036',
        50: 'ce1a4b',
        60: 'f37596',
        70: 'f58ba7',
        80: 'fbd0db',
        95: 'fff1f4'
    }),
    red: fillShades({
        5: '450001',
        10: '490102',
        20: '640304',
        30: '800506',
        40: 'a11012',
        50: 'd11a1e',
        60: 'f97476',
        70: 'fa8b8d',
        80: 'fdcfcf',
        95: 'fff1f1'
    }),
    black: '000000',
    white: 'ffffff'
}