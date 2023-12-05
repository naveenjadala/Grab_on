const request = require("supertest");
const UserRouter = require("../../../src/routes/UserRouter");
const { loginUser } = require("../../../src/controllers/UserContorller");

describe("Test the root path", () => {
  const req = {
    body: {
      email: "jadala@gmail.com",
      password: "naveen",
    },
  };
  test("It should respond with 'Hello world'", async () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const response = await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "user logged in successfully",
    });
  });
  test("userlogin failes", async () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    try {
      await loginUser(req, res);
    } catch (error) {
      expect(error.response.status).toHaveBeenCalledWith(401);
      expect(error.response.json).toHaveBeenCalledWith({
        message: "Authentication Failed",
      });
    }
  });
});
