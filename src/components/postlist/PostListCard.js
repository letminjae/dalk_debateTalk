import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

import FlexGrid from "../../elements/FlexGrid";
import Chip from "../../elements/Chip";
import Badge from "../../elements/Badge";
import Grid from "../../elements/Grid";
import Image from "../../elements/Image";
import noImage from "../../image/shared/noImage.png";

import Blind from "../shared/Blind";
import { rank, discriminant } from "../../data/rank";

import { ReactComponent as Person } from "../../image/post/person.svg";
import { ReactComponent as Textsms } from "../../image/post/textsms.svg";
import { ReactComponent as Notification } from "../../image/post/notification.svg";

const PostListCard = (props) => {
  const userRank = rank[discriminant(props.userInfo.ex, props.userInfo.rank)];
  const boardId = props.boardId;

  const [blindState, setBlindState] = useState(false);

  const enterDetail = () => {
    if (blindState) {
      return;
    }
    history.push(`/detail/${boardId}`);
  };

  useEffect(() => {
    if (props.warnCnt >= 3) {
      setBlindState(true);
    }
  }, []);

  return (
    <>
      <CardBox className="moreBox" is_column _onClick={enterDetail}>
        <FlexGrid is_flex between>
          <FlexGrid is_flex gap="8px">
            {props.category.map((el, i) => {
              return <Chip key={i}>{el}</Chip>;
            })}
          </FlexGrid>

          <FlexGrid
            center
            justifyContent="flex-end"
            gap="4px"
            marginRight="5px"
          >
            <Badge src={userRank.img}></Badge>
            {props.userInfo.nickname}
          </FlexGrid>
        </FlexGrid>

        <FlexGrid is_flex between center>
          <FlexGrid width="200px">
            <Image
              src={props.filePath ? props.filePath : noImage}
              borderRadius="15px"
            />
          </FlexGrid>

          <FlexGrid
            is_column
            justifyContent="space-between"
            height="100%"
            gap="8px"
          >
            {props.winner?.includes("무승부") ? (
              <>
                <Topic>{props.topicA}</Topic>
                <VS center>VS</VS>
                <Topic>{props.topicB}</Topic>
              </>
            ) : props.winner?.includes(props.topicA) ? (
              <>
                <WinnerTopic>{props.topicA}</WinnerTopic>
                <VS center>VS</VS>
                <Topic>{props.topicB}</Topic>
              </>
            ) : (
              <>
                <Topic>{props.topicA}</Topic>
                <VS center>VS</VS>
                <WinnerTopic>{props.topicB}</WinnerTopic>
              </>
            )}

            <DebateInfo>
              <Grid display="flex">
                <Person style={{ margin: "4px 4px 0px 0px", width: "20px" }} />
                <div>{props.voteCnt}</div>
              </Grid>
              <div>|</div>
              <Grid display="flex">
                <Textsms style={{ margin: "4px 4px 0px 0px", width: "20px" }} />
                {props.commentCnt}
              </Grid>
              <div>|</div>
              <Grid display="flex">
                <Notification style={{ margin: "4px 4px 0px 0px", width: "20px" }} />
                {props.warnCnt}
              </Grid>
            </DebateInfo>
          </FlexGrid>
        </FlexGrid>
        {blindState && <Blind>블라인드 처리된 게시물</Blind>}
      </CardBox>
    </>
  );
};

const CardBox = styled(FlexGrid)`
  padding: 16px 0;
  background-color: white;
  overflow: hidden;
  margin-bottom: 8px;
  cursor: zoom-in;
`;

const VS = styled(FlexGrid)`
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.black};
  color: ${(props) => props.theme.color.orange};
  font-family: "Noto Sans", sans-serif;
`;

const WinnerTopic = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  line-height: 20px;
  color: ${(props) => props.theme.color.orange};
`;

const Topic = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  line-height: 20px;
`;

const DebateInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #efefef;
  border-radius: 10px;
  height: 30px;
  padding: 0px 30px;
`;

export default React.memo(PostListCard);
