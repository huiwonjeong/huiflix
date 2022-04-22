import styled from "styled-components";

const FooterWrapper = styled.div`
  position: relative;
  top: -150px;
  height: 10px;
`;

const Contents = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 12px;
`;

function Footer() {
  return (
    <FooterWrapper>
      <hr />
      <Contents>
        Huiflix
        <br />
        jhwwhj1224@naver.com / Harry Jeong
      </Contents>
    </FooterWrapper>
  );
}

export default Footer;
