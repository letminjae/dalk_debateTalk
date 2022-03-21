import React from "react";
import NewHeader from "../shared/NewHeader";
import Footer from "../shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/chat";

import ContentContainer from "../elements/Container";

import FlexGrid from "../elements/FlexGrid";
import MainCarousel from "../components/main/MainCarousel";
import TopRank from "../components/main/TopRank";
import MainEmpty from "../components/main/MainEmpty";
import XScrollDrag from "../components/shared/XScrollDrag";
import MainCategoryCard from "../components/main/MainCategoryCard";
import MainCard from "../components/main/MainCard";
import styled from "styled-components";
import { history } from "../redux/configStore";
import Text from "../elements/Text";
import fireDalk from "../image/shared/fireDalk.png";

const Main = (props) => {
  const dispatch = useDispatch();

  const roomList = useSelector((state) => state.chat.roomList);
  // roomList가 비어있으면 서버에서 데이터 가져옴
  React.useEffect(() => {
    dispatch(actionCreators.loadMainRoomDB());

    return () => dispatch(actionCreators.clear());
  }, []);

  return (
    <>
      <NewHeader page="메인" />
      <ContentContainer backgroundColor="#fbfbfb">
        <FlexGrid is_column>
          {/* 캐러셀 */}
          <MainCarousel />
          {/* 1,2,3등 */}
          <TopRank />
          {/* 채팅방 컨텐츠 3개 -> 추천 카테고리 -> 3개 */}
          <FlexGrid is_column padding="24px" gap="22px">
            <FlexGrid paddingBottom="58px">
              <Text size="headline1" weight="medium" lineHeight="38px">
                실시간 HOT한
                <br /> 토론에 참여해보세요!
              </Text>
              <FireDalk src={fireDalk} />
            </FlexGrid>

            {roomList.map((el, i) => {
              if (i < 3) return <MainCard key={i} {...el} page="main" />;
            })}

            {/* 추천 카테고리 */}
            <CategoryTap is_column>
              <FlexGrid is_column padding="0 24px">
                <Text size="body1">일상토론 찾아보기</Text>
                <Text size="headline2" weight="medium">
                  다양한 주제로 토론에 참여해보세요!
                </Text>
              </FlexGrid>
              <XScrollDrag gap="16px" padding="0 24px">
                <MainCategoryCard />
              </XScrollDrag>
            </CategoryTap>

            {roomList.map((el, i) => {
              if (i >= 3) return <MainCard key={i} {...el} page="main" />;
            })}
          </FlexGrid>

          {/* 더보기 버튼 */}
          <MoreButton onClick={() => history.push("/more")}>
            더 많은 토론보기 &gt;
          </MoreButton>
        </FlexGrid>
      </ContentContainer>
      <Footer />
    </>
  );
};

Main.defaultProps = {};

const CategoryTap = styled(FlexGrid)`
  width: calc(100% + 48px);
  background-color: #faede1;
  padding: 24px 0 0 0;
  margin: 0 -24px;
`;

const MoreButton = styled.div`
  margin: 31px 0 58px 0;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  text-align: center;
`;

const FireDalk = styled.img`
  width: 53%;

  position: absolute;
  right: -30px;
  bottom: -90px;

  transform: rotate(18.52deg);
`;

export default Main;
