import { describe, expect, it } from "vitest";
import { parseYouTubeInput, type Expect, type ParsedInput } from "./parse-input";

const VID = "dQw4w9WgXcQ";
const CH = "UC_x5XG1OV2P6uZZ5FSM9Ttw";
const PL = "PLBCF2DAC6FFB574DE";

const video = (id = VID, playlistId?: string): ParsedInput => (playlistId ? { kind: "video", id, playlistId } : { kind: "video", id });
const channelId = (id = CH): ParsedInput => ({ kind: "channel", by: "id", id });
const handle = (h: string): ParsedInput => ({ kind: "channel", by: "handle", handle: h });

const valid: [string, ParsedInput, Expect?][] = [
  // Watch URLs
  [`https://www.youtube.com/watch?v=${VID}`, video()],
  [`http://www.youtube.com/watch?v=${VID}`, video()],
  [`https://youtube.com/watch?v=${VID}`, video()],
  [`www.youtube.com/watch?v=${VID}`, video()],
  [`youtube.com/watch?v=${VID}`, video()],
  [`//www.youtube.com/watch?v=${VID}`, video()],
  [`https://m.youtube.com/watch?v=${VID}`, video()],
  [`https://music.youtube.com/watch?v=${VID}`, video()],
  [`https://www.youtube.com/watch?v=${VID}&t=42s`, video()],
  [`https://www.youtube.com/watch?feature=share&v=${VID}`, video()],
  [`https://www.youtube.com/watch?v=${VID}&list=${PL}&index=3`, video(VID, PL)],
  [`https://www.youtube.com/watch?v=${VID}&si=abcDEF123`, video()],
  [`https://www.youtube.com/watch?v=${VID}#comments`, video()],
  [`  https://www.youtube.com/watch?v=${VID}  `, video()],
  [`HTTPS://WWW.YOUTUBE.COM/watch?v=${VID}`, video()],
  // Short links
  [`https://youtu.be/${VID}`, video()],
  [`youtu.be/${VID}`, video()],
  [`https://youtu.be/${VID}?t=10`, video()],
  [`https://youtu.be/${VID}?si=XyZ`, video()],
  [`https://youtu.be/${VID}?list=${PL}`, video(VID, PL)],
  // Shorts, live, embed
  [`https://www.youtube.com/shorts/${VID}`, video()],
  [`https://youtube.com/shorts/${VID}?si=abc`, video()],
  [`https://m.youtube.com/shorts/${VID}`, video()],
  [`https://www.youtube.com/live/${VID}`, video()],
  [`https://www.youtube.com/live/${VID}?feature=share`, video()],
  [`https://www.youtube.com/embed/${VID}`, video()],
  [`https://www.youtube-nocookie.com/embed/${VID}?start=5`, video()],
  [`https://www.youtube.com/v/${VID}`, video()],
  // Channels
  [`https://www.youtube.com/channel/${CH}`, channelId()],
  [`https://www.youtube.com/channel/${CH}/videos`, channelId()],
  [`youtube.com/channel/${CH}`, channelId()],
  [CH, channelId()],
  [`https://www.youtube.com/@mkbhd`, handle("mkbhd")],
  [`https://www.youtube.com/@mkbhd/videos`, handle("mkbhd")],
  [`https://m.youtube.com/@mkbhd?si=abc`, handle("mkbhd")],
  [`youtube.com/@Veritasium`, handle("Veritasium")],
  [`@mkbhd`, handle("mkbhd")],
  [`@some.creator_01-x`, handle("some.creator_01-x")],
  [`https://www.youtube.com/@%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE`, handle("বাংলা")],
  [`mkbhd`, handle("mkbhd"), "channel"],
  [`veritasium`, handle("veritasium")],
  [`https://www.youtube.com/user/GoogleDevelopers`, { kind: "channel", by: "username", username: "GoogleDevelopers" }],
  // Playlists
  [`https://www.youtube.com/playlist?list=${PL}`, { kind: "playlist", id: PL }],
  [`https://www.youtube.com/embed/videoseries?list=${PL}`, { kind: "playlist", id: PL }],
  [PL, { kind: "playlist", id: PL }],
  // Bare video IDs
  [VID, video()],
  [VID, video(), "video"],
];

describe("parseYouTubeInput: valid inputs", () => {
  it.each(valid)("%s", (input, expected, expectKind) => {
    expect(parseYouTubeInput(input, expectKind)).toEqual({ ok: true, value: expected });
  });
});

const invalid: [string, string, Expect?][] = [
  ["", "empty"],
  ["    ", "empty"],
  ["x".repeat(3000), "too_long"],
  ["https://vimeo.com/123456", "not_youtube"],
  [`https://youtube.com.evil.example/watch?v=${VID}`, "not_youtube"],
  ["https://www.youtube.com/c/SomeCustomName", "custom_url"],
  ["https://www.youtube.com/SomeVanityName", "custom_url"],
  ["https://www.youtube.com/watch?v=short", "unrecognized"],
  ["https://www.youtube.com/watch", "unrecognized"],
  ["https://youtu.be/", "unrecognized"],
  ["https://www.youtube.com/channel/notachannel", "unrecognized"],
  ["https://www.youtube.com/feed/subscriptions", "unrecognized"],
  ["two words", "unrecognized"],
  ["@a", "unrecognized"],
  ["mkbhd", "unrecognized", "video"],
];

describe("parseYouTubeInput: errors", () => {
  it.each(invalid)("%s → %s", (input, code, expectKind) => {
    const result = parseYouTubeInput(input, expectKind);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe(code);
      expect(result.message.length).toBeGreaterThan(10);
    }
  });
});
