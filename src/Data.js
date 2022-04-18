export const Users = [
    {
        id: 1,
        rule: 11,
        name: 'Dat1',
    },
    {
        id: 2,
        rule: 8,
        name: 'Dat2',
    },
    {
        id: 3,
        rule: 10,
        name: 'Dat3',
    },
    {
        id: 4,
        rule: 6,
        name: 'Dat4',
    },
    {
        id: 5,
        rule: 5,
        name: 'Dat5',
    },
    {
        id: 6,
        rule: 4,
        name: 'Dat6',
    },
    {
        id: 7,
        rule: 10,
        name: 'Dat7',
    },
    {
        id: 8,
        rule: 5,
        name: 'Dat8',
    },
    {
        id: 9,
        rule: 10,
        name: 'Dat8',
    },
];

export const StepsDay = [
    {
        type: 1,
        name: 'Discussion',
        title: 'Dân làng thảo luận',
        desc: 'Dân làng cùng nhau thảo luận xem ai là sói!',
        time: 60,
    },
    {
        type: 1,
        name: 'Vote',
        title: 'Dân làng vote giết',
        time: 30,
        desc: 'Dân làng cùng nhau vote giết người mà mọi người nghi ngờ là sói.',
    },
    {
        type: 1,
        name: 'Defense',
        title: 'Bào chữa',
        time: 60,
        desc: 'Người được chọn hãy nói ra quan điểm của mình.',
    },
    {
        type: 1,
        name: 'Agree',
        title: 'Dân làng bỏ phiếu giết',
        desc: 'Dân làng cùng nhau hãy bỏ phiếu có giết người được chọn không.',
        time: 30,
        actions: ['kill'],
        kill: 1,
    },
];
export const StepsNight = [
    {
        type: 2,
        name: 'cupid ',
        title: 'Cupid hãy chọn cặp yêu nhau',
        desc: 'Thần tình yêu hãy thức dậy và lựa chọn cặp đôi yêu nhau.',
        time: 60,
        isFirst: true,
        actions: ['couple'],
    },
    {
        type: 2,
        name: 'couple',
        time: 30,
        isFirst: true,
        title: 'Cặp đôi yêu nhau gặp mặt',
        desc: 'Cặp đôi yêu nhau hãy thức dậy gặp mặt.',
    },
    {
        type: 2,
        name: 'seek',
        title: 'Tiên tri hãy dậy đi nào.',
        desc: 'Tiên tri hãy chỉ ra người muốn soi.',
        time: 30,
    },
    {
        type: 2,
        name: 'guard ',
        title: 'Bảo vệ hãy chọn ra người được bảo vệ',
        desc: 'Bảo vệ có thể lựa chọn người mình muốn bảo vệ.',
        time: 30,
        actions: ['guard'],
    },
    {
        type: 2,
        name: 'wolf ',
        title: 'Sói ơi hãy dậy đi nào',
        desc: 'Sói hãy chọn ra con mồi mình muốn giết',
        time: 30,
        actions: ['kill'],
        kill: 1,
    },
    {
        type: 2,
        name: 'witch',
        title: 'Phù thủy hãy dậy đi nào',
        desc: 'Phù Thủy hãy dùng những lọ thuốc của mình để cứu hoặc giết người mình muốn.',
        time: 30,
        actions: ['kill', 'help'],
        kill: 1,
        help: 1,
    },
];
export const Steps = [
    ...StepsNight,
    ...StepsDay,
    {
        type: 1,
        name: 'endday',
        title: 'Chuẩn bị cho ngày mới',
        time: 0,
    },
];
const Faction = {};

export const Rule = [
    {
        id: 1,
        name: 'Dân làng',
        imageUrl: '/static/danlang.png',
        description: 'Không có tính năng đặc biệt nào cả, ngủ suốt đêm và tham gia biểu quyết tìm Sói vào ban ngày.',
    },
    {
        id: 2,
        name: 'Tiên tri',
        imageUrl: '/static/tientri.png',
        description:
            'Mỗi đêm, Tiên tri chỉ tay vào một người. Quản trò sẽ cho Tiên tri biết người đó có phải là Ma sói hay không bằng cách gật hoặc lắc đầu',
    },
    {
        id: 3,
        name: 'Phù thủy',
        imageUrl: '/static/phuthuy.png',
        description:
            'Phù Thủy được gọi dậy và quản trò sẽ chỉ ra ai là người bị Ma sói cắn, Phù Thủy có quyền chọn cứu người đó hoặc không. Ngoài ra, Phù thủy có thể dùng lọ thuốc độc để giết chết người mà mình nghi là ma sói. Có thể sử dụng 1 lúc cả 2 lọ thuốc khi đó tác dụng của thuốc sẽ mất. Một khi đã dùng bình thì Phù Thủy sẽ mất đi chức năng tương ứng, tuy nhiên vẫn được gọi dậy mỗi đêm và biết ai chết.',
    },
    {
        id: 4,
        name: 'Bảo vệ',
        imageUrl: '/static/baove.png',
        description: 'Mỗi đêm được thức dậy bảo vệ bất kỳ ai không bị giết đêm đó. không được bảo vệ 1 người 2 ngày liên tiếp. ',
    },
    {
        id: 5,
        name: 'Cupid',
        imageUrl: '/static/cupid.png',
        description:
            'Đầu mỗi ván chơi, Cupid sẽ được gọi dậy và chọn ra hai người yêu nhau. Cupid sau đó nhắm mắt lại và hai người yêu nhau sẽ được Quản Trò gọi dậy để biết mặt và Vai Trò của nhau. Nếu hai người thuộc hai phe khác nhau (Sói vs Dân) thì họ thành phe thứ 3 với nhiệm vụ là hai người cuối cùng sống sót. Trong trường hợp, có 1 trong 2 người được ghép đôi bị chết thì người còn lại cũng phải chết chung. ',
    },
    {
        id: 6,
        name: 'Ma sói',
        imageUrl: '/static/masoi.png',
        description:
            'Vào ban đêm, Ma sói sẽ tỉnh dậy cùng nhau và thống nhất giết 1 nạn nhận nào đó. Sói có thể không giết người nào và không được giết sói khác.',
    },
    {
        id: 7,
        name: 'Sói cô đơn',
        imageUrl: '/static/soicodon.png',
        description: 'Hằng đêm, thức dậy cùng những con Sói khác. Sói cô đơn chỉ thắng cuộc nếu là người chơi cuối cùng trong trò chơi.',
    },
    {
        id: 8,
        name: 'Sói con',
        imageUrl: '/static/soicon.png',
        description:
            'Sói con là Sói và thức dậy cùng Sói mỗi đêm. Nếu Sói con bị giết, Sói còn lại sẽ giết 2 người vào đêm hôm sau. Sói có thể chọn giết Sói Con như 1 sự hy sinh ( Tất cả Sói bao gồm cả Sói con đều đồng ý việc đó). Khi đó Sói có thể lập tức giết 2 người chơi khác vào ngay đêm hôm đó.',
    },
    {
        id: 9,
        name: 'Người cứng cỏi',
        imageUrl: '/static/ngcungcoi.png',
        description: 'Nếu bị Sói cắn, Người cứng cói sẽ chết vào đêm tiếp theo chứ không phải ngay tại đêm đó.',
    },
    {
        id: 10,
        name: 'Thợ săn',
        imageUrl: '/static/thosan.png',
        description: 'Thợ săn mỗi đêm được thức dậy để giết 1 người',
    },

    {
        id: 11,
        name: 'Già làng',
        imageUrl: '/static/gialang.png',
        description: 'Già Làng sẽ có 2 mạng sống. Nếu như Già Làng chết thì mọi quyền năng đều sẽ mất hiệu lực, ví dụ quyền năng Bảo vệ, Tiên tri',
    },
];
