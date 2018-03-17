const port = parseInt(process.env.PORT, 10);

class AppDriver {
  open = () => {
    console.log("url", `http://localhost:${port}`);
    return page.goto(`http://localhost:${port}`);
  };

  isGridVisible = async () => {};
}

export default new AppDriver();
