const { onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const { GoogleGenAI } = require("@google/genai");

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

exports.scoreImage = onCall(
  {
    secrets: [GEMINI_API_KEY],
  },
  async (request) => {
    const image = request.data.image;

    if (!image) {
      throw new Error("画像がありません");
    }

    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY.value(),
    });

    const prompt = `
あなたはSukima度を判定するAIです。

以下の基準で0〜100点で評価してください。

・写真内に物理的な隙間があるか
・隙間が写真の主題になっているか
・リラックスした雰囲気があるか
・日常らしい写真か

JSONのみ返してください。

{
 "score":85,
 "reason":"家具の隙間がよく写っています"
}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: image,
              },
            },
          ],
        },
      ],
    });

    let text = result.text;

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    return JSON.parse(text);
  }
);