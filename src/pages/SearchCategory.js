import React, {useState, useEffect} from 'react'
import apis from '../shared/apis';
import styled from 'styled-components';
import Header from '../shared/Header';
import Grid from '../elements/Grid';
import PostListCategory from '../components/postlist/PostListCategory';
import PostListCard from '../components/postlist/PostListCard';

function SearchCategory(props) {
  const page = props.match.params.category;

  const [searchCategoryList, setSearchCategoryList] = useState([]);

  useEffect(() => {
    apis.getDebateKeyword(page)
        .then((res) => {
          console.log("카테고리 목록 가져오기 성공", res.data)
          setSearchCategoryList(res.data)
        })
        .catch((err) => {
          console.log("카테고리 목록 가져오기 실패", err)
        })
  },[page])

  const [debateList, setDebateList] = useState([]);
  const [keyword, setKeyword] = useState("");

  // 클릭하면 스크롤이 위로 올라가는 이벤트핸들러
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  //엔터 키다운 이벤트
  const onKeyDown = (e) => {
    if(e.keyCode === 13){
      searchDebate();
    }
  }

  //검색 밸류
  const handleKeyword = (e) => {
    setKeyword(e.target.value)
  }

  const [searchDebateList, setSearchDebateList] = useState([]);
  //검색결과
  const searchDebate = () => {
    apis.getDebateKeyword(keyword)
        .then((res) => {
          console.log("검색 성공" ,res.data)
          setSearchDebateList(res.data)
        })
        .catch((err) => {
          console.log("검색 실패" ,err)
        })
  }

  return (
    <>
      <Grid height="100%" overflow="scroll">
        <Header page="메인" />
        <Grid margin="30px">
          <Container>
            <InputContainer id="SearchBar">
              <Input placeholder="토론 결과를 검색해보세요" value={keyword} onChange={handleKeyword} onKeyDown={onKeyDown}/>
              <button onClick={searchDebate}>검색</button>
            </InputContainer>
          </Container>
          <Grid padding="20px 20px 20px">
            <PostListCategory />
          </Grid>
          <Grid margin="20px 0px" justifyContent="center">
          {!searchDebateList.length == 0 ?
            searchDebateList.map((d, idx) => {
              return <PostListCard {...d} key={idx} debateList={debateList} />
            }) :
            searchCategoryList.map((d, idx) => {
              return <PostListCard {...d} key={idx} debateList={debateList} />
            })
          }
            <button onClick={handleTop}>TOP</button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`
const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-self: center;
`

const Input = styled.input`
  width: 100%;
  height: 44px;
  background-color: #e5e5e5;
  font-weight: 500;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  padding: 13px 16px;
`

export default SearchCategory