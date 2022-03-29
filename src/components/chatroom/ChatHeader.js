import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Center from "../../elements/Center";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import CountDownTimer from "./CountDownTimer";
import Modal from "../shared/Modal";
import Vote from "./Vote";
import GaugeTimer from "./GaugeTimer";
import { useDispatch } from "react-redux";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { ReactComponent as Timer } from "../../image/chatRoom/timer.svg";
import { ReactComponent as Unfold } from "../../image/chatRoom/unfold.svg";

const ChatHeader = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(false);
  const [modalState, setModalState] = React.useState(false);
  const [data, setData] = React.useState();

  const roomInfo = useSelector((state) => state.chat.currentRoom.roomInfo);
  console.log(roomInfo);

  const vote = (topic) => {
    if (roomInfo.userVote) {
      dispatch(alertAction.open({ message: "이미 투표에 참가하셨습니다." }));
      return;
    }
    setData({ topic: topic });
    setModalState(true);
  };

  return (
    <>
      {roomInfo && (
        <>
          <GaugeTimer {...roomInfo} page="chatRoom" />
          <FlexGrid height="60px" padding="16px">
            <Center>
              <CountDownTimer {...roomInfo} />
            </Center>

            <FlexGrid justifyContent="flex-end">
              <Open state={state} onClick={() => setState(!state)} />
            </FlexGrid>
          </FlexGrid>

          <InfoWrap state={state}>
            <DefaultTopic
              onClick={() => vote(true)}
              state={state}
              userVote={roomInfo.userVote?.userPick === true}
            >
              <Topic>{roomInfo.topicA}</Topic>
              {state && roomInfo.userVote?.userPick === true && (
                <Text
                  position="absolute"
                  top="110px"
                  fontSize="12px"
                  color="white"
                  lineHeight="20px"
                >
                  {roomInfo.userVote.userPoint}RP
                </Text>
              )}

              {state && !roomInfo.userVote && (
                <Text
                  position="absolute"
                  top="110px"
                  fontSize="12px"
                  color="#C0C0C0"
                  lineHeight="20px"
                >
                  선택하기
                </Text>
              )}
            </DefaultTopic>
            <Text size="headline2" weight="black" color="orange">
              VS
            </Text>
            <DefaultTopic
              onClick={() => vote(false)}
              state={state}
              userVote={roomInfo.userVote?.userPick === false}
            >
              <Topic>{roomInfo.topicB}</Topic>
              {state && roomInfo.userVote?.userPick === false && (
                <Text
                  position="absolute"
                  top="110px"
                  fontSize="12px"
                  color="white"
                  lineHeight="20px"
                >
                  {roomInfo.userVote.userPoint}RP
                </Text>
              )}
              {state && !roomInfo.userVote && (
                <Text
                  position="absolute"
                  top="110px"
                  fontSize="12px"
                  color="#C0C0C0"
                  lineHeight="20px"
                >
                  선택하기
                </Text>
              )}
            </DefaultTopic>
          </InfoWrap>
        </>
      )}
      {modalState && (
        <Modal modalState={modalState} setModalState={setModalState}>
          <Vote {...data} setModalState={setModalState} />
        </Modal>
      )}
    </>
  );
};

const Open = styled(Unfold)`
  transform: ${(props) => props.state && "rotate(180deg)"};
  transition: 0.2s;
`;

const Topic = styled.div``;

const DefaultTopic = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 28px;

  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  border-radius: 10px;

  transition: 0.3s;
  //color: ${(props) => (props.state ? "orange" : "orange")};
  & * {
    color: ${(props) =>
      props.state
        ? props.userVote
          ? "white"
          : props.theme.color.black
        : props.userVote
        ? props.theme.color.orange
        : props.theme.color.black};
  }

  background-color: ${(props) =>
    props.state
      ? props.userVote
        ? props.theme.color.orange
        : "#FAFAFA"
      : "white"};

  box-shadow: ${(props) => props.state && "0px 2px 6px rgba(0, 0, 0, 0.15)"};

  ${Topic} {
    max-width: 140px;

    ${(props) =>
      !props.state &&
      "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"}
  }
`;

const InfoWrap = styled.div`
  background-color: #eee;
  height: ${(props) => (props.state ? 200 : 80)}px;
  transition: 0.2s;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 14px;

  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;

  background: #fefefe;

  padding: 16px 28px 24px 28px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
`;

export default ChatHeader;
