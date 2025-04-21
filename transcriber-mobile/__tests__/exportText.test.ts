import { exportText } from "../utils/exportText";

jest.mock("react-native", () => ({
  Share: {
    share: jest.fn(() => Promise.resolve({ action: "sharedAction" })),
  },
}));

const { Share } = jest.requireMock("react-native");

describe("exportText", () => {
  it("deve compartilhar o texto com sucesso", async () => {
    const text = "Texto de teste";
    await expect(exportText(text)).resolves.not.toThrow();
  });

  it("deve lidar com erros ao compartilhar o texto", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest
      .mocked(Share.share)
      .mockRejectedValueOnce(new Error("Erro ao compartilhar"));

    const text = "Texto de teste";
    await expect(exportText(text)).rejects.toThrow("Erro ao compartilhar");
    expect(console.error).toHaveBeenCalledWith(
      "Erro ao compartilhar o texto:",
      expect.any(Error)
    );
  });
});
