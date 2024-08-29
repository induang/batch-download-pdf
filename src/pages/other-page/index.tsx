import { Button, Card, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  return (
    <ConfigProvider theme={{ token: { borderRadius: 2 } }}>
      <Card title="其他页面, 点击按钮回到原页面">
        <Button onClick={() => navigate(-1)}>返回</Button>
      </Card>
    </ConfigProvider>
  );
}
