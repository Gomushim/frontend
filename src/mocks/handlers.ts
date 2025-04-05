import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({
      id: 1,
      name: "Mock User",
      email: "mock@user.dev",
    });
  }),
];
