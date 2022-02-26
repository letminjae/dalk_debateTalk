import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import { history } from "../redux/configStore";
import TestLogo from "../image/testlogo.jpeg";
import HamburgerModal from "../components/HamburgerModal";

const Header = (props) => {
  const { page } = props;
  const [modalState, setModalState] = React.useState(false);

  return (
    <HeaderContainer>
      <Grid position="relative" width="100%">
        <HamburgerModal modalState={modalState} setModalState={setModalState}>
          <Grid
            position="absolute"
            left="50%"
            top="30%"
            transform="translate(-50%)"
          >
            <Logo src={TestLogo} />
          </Grid>
          <Grid
            position="absolute"
            bottom="0"
            display="flex"
            flexDirection="column"
            gap="10px"
            padding="15px"
            fontSize="20px"
            cursor="pointer"
          >
            <Grid>로그인</Grid>
            <Grid>회원가입</Grid>
            <Grid>마이페이지</Grid>
            <Grid>토론리스트</Grid>
          </Grid>
        </HamburgerModal>
        {/* 페이지가 메인이면 햄버거 버튼 아니면 뒤로가기 버튼 */}
        <Grid position="absolute" left="0" top="0">
          {page === "메인" ? (
            <Button onClick={() => setModalState(true)}>
              햄버거
            </Button>
          ) : (
            <Button onClick={() => history.goBack()}>뒤로가기</Button>
          )}
        </Grid>

        {/* 페이지가 메인이면 로고 이미지 출력 아니면 텍스트 출력 */}
        <Grid
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        >
          {page === "메인" ? <Logo src={TestLogo} /> : page}
        </Grid>
      </Grid>
    </HeaderContainer>
  );
};

Header.defaultProps = {};

const HeaderContainer = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 50px;
  background-color: gray;
  display: flex;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

export default Header;
