import { Calendar, theme } from "antd";
const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};
const TrackCalendar = () => {
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: "100%",
    border: `3px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
};

export default TrackCalendar;
