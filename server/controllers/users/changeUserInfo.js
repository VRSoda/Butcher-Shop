const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
    // 쿠키가 없으면 에러 반환
    if (!req.headers.cookie) {
        return res.status(401).send(
            { data: null, message: 'there are no cookies' }
        );
    }

    // 쿠키가 맞지 않으면 에러 반환
    if (!isAuthorized(req)) {
        return res.status(401).send(
            { data: null, message: 'not authorized' }
        );
    }

    // 해당 타겟 업데이트
    const accessTokenData = isAuthorized(req);
    const userInfo = Object.assign({},req.body) // 객체를 복사한다.
    await user.update(userInfo, {where: {id: accessTokenData.id}})
    

    // 처리 완료 메시지 반환
    res.status(200).send(`${userInfo} change ok`)
}