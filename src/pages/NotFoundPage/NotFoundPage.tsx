import { Button } from "antd";
import * as S from "./styled";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Title>Страница не найдена :(</S.Title>
      <Button onClick={() => navigate(-1)} variant="text">
        Нажмите, чтобы вернуться
      </Button>
    </S.Wrapper>
  );
};

export default NotFoundPage;
