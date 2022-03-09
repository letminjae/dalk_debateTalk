import React from "react";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/chat";
import ContentContainer from "../elements/Container";

import FlexGrid from "../elements/FlexGrid";
import MainCarousel from "../components/main/MainCarousel";
import TopRank from "../components/main/TopRank";
import MainEmpty from "../components/main/MainEmpty";
import Grid from "../elements/Grid";
import XScrollDrag from "../components/shared/XScrollDrag";
import MainCategoryCard from "../components/main/MainCategoryCard";
import MainCard from "../components/main/MainCard";
import styled from "styled-components";
import { history } from "../redux/configStore";
import apis from "../shared/apis";

const Main = (props) => {
  const [userRankList, setUserRankList] = React.useState();
  const roomList = useSelector((state) => state.chat.roomList);

  console.log(roomList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionCreators.loadMainRoomDB());

    apis
      .rank()
      .then((res) => {
        setUserRankList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header page="메인" />
      <ContentContainer>
        <FlexGrid is_column>
          <MainCarousel />
          {userRankList && <TopRank userRankList={userRankList} />}
          <FlexGrid is_column padding="16px">
            {roomList.map((el, i) => {
              return <MainCard key={i} {...el} page="메인" />;
            })}
          </FlexGrid>
          {/* <MainCard warnCnt="10" /> */}
          {roomList.length === 0 ? (
            // 채팅방이 없을때 표시 화면
            <MainEmpty />
          ) : (
            <>
              <FlexGrid is_column>
                <Grid padding="16px" fontSize="27px" fontWeight="600">
                  다양한 주제로
                  <br />
                  토론에 참여해보세요!
                </Grid>
                <XScrollDrag>
                  <MainCategoryCard />
                </XScrollDrag>
              </FlexGrid>
              <FlexGrid is_flex center>
                <MoreButton onClick={() => history.push("/more")}>
                  더 많은 토론보기
                </MoreButton>
              </FlexGrid>
            </>
          )}
        </FlexGrid>
      </ContentContainer>
      <Footer />
    </>
  );
};

Main.defaultProps = {};

const MoreButton = styled.button`
  width: 100%;
  margin: 15px 72px;
  background-color: #c4c4c4;
  color: white;
  border: none;
  border-radius: 30px;

  height: 54px;

  font-size: 24px;
  font-weight: bold;
`;

export default Main;
