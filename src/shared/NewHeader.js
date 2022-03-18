import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import Modal from "../components/shared/Modal";

import Center from "../elements/Center";
import Text from "../elements/Text";
import FlexGrid from "../elements/FlexGrid";
import SearchRoom from "../components/main/SearchRoom";

const NewHeader = (props) => {
  const { page, users, children, meatball, color, line } = props;
  const [modalState, setModalState] = React.useState(false);
  const [searchState, setSearchState] = React.useState(false);
  const path = window.location.pathname;

  if (path === "/") {
    return (
      <HeaderContainer style={{ justifyContent: "flex-end" }}>
        <Logo>DALKING</Logo>
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          onClick={() => {
            setSearchState(true);
          }}
        >
          <path
            d="M21.9582 19.8332H20.8391L20.4424 19.4507C22.1424 17.4674 23.0207 14.7616 22.5391 11.8857C21.8732 7.94741 18.5866 4.80241 14.6199 4.32074C8.62741 3.58408 3.58408 8.62741 4.32074 14.6199C4.80241 18.5866 7.94741 21.8732 11.8857 22.5391C14.7616 23.0207 17.4674 22.1424 19.4507 20.4424L19.8332 20.8391V21.9582L25.8541 27.9791C26.4349 28.5599 27.3841 28.5599 27.9649 27.9791C28.5457 27.3982 28.5457 26.4491 27.9649 25.8682L21.9582 19.8332ZM13.4582 19.8332C9.93074 19.8332 7.08324 16.9857 7.08324 13.4582C7.08324 9.93074 9.93074 7.08324 13.4582 7.08324C16.9857 7.08324 19.8332 9.93074 19.8332 13.4582C19.8332 16.9857 16.9857 19.8332 13.4582 19.8332Z"
            fill="#C5C5C5"
          />
        </svg>

        {searchState && (
          <SearchRoom state={searchState} setState={setSearchState} />
        )}
      </HeaderContainer>
    );
  }
  return (
    <>
      <Modal
        modalState={modalState}
        setModalState={setModalState}
        type="hamburger"
      >
        {children}
      </Modal>
      <HeaderContainer line>
        {/* 뒤로가기 버튼 */}
        <Left onClick={() => history.goBack()}>
          <svg width="34" height="34" viewBox="0 0 34 34">
            <path
              d="M16.5325 5.48248L14.025 2.97498L0 17L14.025 31.025L16.5325 28.5175L5.015 17L16.5325 5.48248Z"
              fill="#C5C5C5"
            />
          </svg>
        </Left>

        <Center center>
          <FlexGrid center gap="0">
            <Text
              size="gnb"
              weight="regular"
              whiteSpace="nowrap"
              margin="0 4px 2px 0"
              color={color && "orange"}
            >
              {page}
            </Text>

            {path.includes("chatroom") && (
              <>
                <svg width="22" height="22" viewBox="0 0 22 22">
                  <path
                    d="M10.9998 11C13.0257 11 14.6665 9.35913 14.6665 7.33329C14.6665 5.30746 13.0257 3.66663 10.9998 3.66663C8.974 3.66663 7.33317 5.30746 7.33317 7.33329C7.33317 9.35913 8.974 11 10.9998 11ZM10.9998 12.8333C8.55234 12.8333 3.6665 14.0616 3.6665 16.5V17.4166C3.6665 17.9208 4.079 18.3333 4.58317 18.3333H17.4165C17.9207 18.3333 18.3332 17.9208 18.3332 17.4166V16.5C18.3332 14.0616 13.4473 12.8333 10.9998 12.8333Z"
                    fill="#686868"
                  />
                </svg>
                <Text size="body1" weight="regular" marginBottom="2px">
                  {users}
                </Text>
              </>
            )}
          </FlexGrid>
        </Center>

        {/* 토글 버튼 */}
        {meatball && (
          <Right onClick={() => setModalState(true)}>
            <svg width="34" height="34" viewBox="0 0 34 34">
              <path
                d="M16.9998 11.3333C18.5582 11.3333 19.8332 10.0583 19.8332 8.49996C19.8332 6.94163 18.5582 5.66663 16.9998 5.66663C15.4415 5.66663 14.1665 6.94163 14.1665 8.49996C14.1665 10.0583 15.4415 11.3333 16.9998 11.3333ZM16.9998 14.1666C15.4415 14.1666 14.1665 15.4416 14.1665 17C14.1665 18.5583 15.4415 19.8333 16.9998 19.8333C18.5582 19.8333 19.8332 18.5583 19.8332 17C19.8332 15.4416 18.5582 14.1666 16.9998 14.1666ZM16.9998 22.6666C15.4415 22.6666 14.1665 23.9416 14.1665 25.5C14.1665 27.0583 15.4415 28.3333 16.9998 28.3333C18.5582 28.3333 19.8332 27.0583 19.8332 25.5C19.8332 23.9416 18.5582 22.6666 16.9998 22.6666Z"
                fill="#C5C5C5"
              />
            </svg>
          </Right>
        )}
      </HeaderContainer>
    </>
  );
};

const Left = styled.div`
  position: absolute;
  left: 16px;
`;

const Right = styled.div`
  position: absolute;
  right: 16px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 70px;

  z-index: 990;
  background-color: white;
  padding: 16px;

  position: relative;
  display: flex;
  align-items: center;

  border-bottom: ${(props) => props.line && "1px solid #c4c4c4"};
`;

const Logo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 26px;
  color: #f19121;
  font-weight: 900;
`;

export default NewHeader;