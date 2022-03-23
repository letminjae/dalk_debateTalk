import Text from "../elements/Text";
import egg from "../image/gacha/egg.svg";
import fail from "../image/gacha/fail.svg";
import success from "../image/gacha/success.svg";

const gachaData = {
  first: {
    img: egg,
    rank: -1,
    message: (
      <div>
        행운뽑기 1회 <br />
        200RP소모
      </div>
    ),
  },
  1: {
    img: success,
    rank: 1,
    point: 1000000,
    message: (
      <div>
        축하합니다! <br />
        <Text color="orange">1,000,000알포인트</Text> 당첨!!
      </div>
    ),
  },
  2: {
    img: success,
    rank: 2,
    point: 100000,
    message: (
      <div>
        축하합니다 2등 입니다!! <br />
        <Text color="orange">100,000알포인트</Text> 당첨!
      </div>
    ),
  },
  3: {
    img: success,
    rank: 3,
    point: 10000,
    message: (
      <div>
        축하합니다! <br />
        <Text color="orange">10,000 알포인트</Text> 당첨!
      </div>
    ),
  },
  4: {
    img: success,
    rank: 4,
    point: 1000,
    message: (
      <div>
        축하합니다! <br />
        <Text color="orange">1,000알포인트</Text> 당첨!
      </div>
    ),
  },
  5: {
    img: success,
    rank: 5,
    point: 500,
    message: (
      <div>
        축하합니다! <br />
        <Text color="orange">500알포인트</Text> 당첨!
      </div>
    ),
  },
  6: {
    img: fail,
    rank: 6,
    point: 0,
    message: (
      <div>
        꽉.. <br />
        아쉬워요...
      </div>
    ),
  },
};

export default gachaData;
