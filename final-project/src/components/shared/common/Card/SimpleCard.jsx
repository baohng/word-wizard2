import { Card } from "antd";
import PropTypes from "prop-types";

const App = ({ title, content }) => (
  <Card
    className="mt-4 border-2"
    title={`${title}`}
    bordered={false}
    style={{
      width: "100%",
    }}
  >
    <p>{content}</p>
  </Card>
);

App.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default App;
