const express = require("express");
const connectDB = require("./config/db");
// app 생성
const app = express();
// PORT 번호 기본값 5000으로 설정
const PORT = process.env.PORT || 5000;

// get요청시 "API Running" 을 response 해주기
app.get("/", (req, res) => {
  res.send("API Running");
});

connectDB();

app.use(express.json({ extended: false }));
app.use("/api/register", require("./routes/api/register"));
app.use("/api/auth", require("./routes/api/token"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));