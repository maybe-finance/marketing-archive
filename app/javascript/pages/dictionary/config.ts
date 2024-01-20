import { Group } from "./types";

export const GROUPS: Group[] = [
  {
    label: "#",
    value: "nonalpha",
    matcher: /^(?![a-z]).*/i,
  },
  {
    label: "A - B",
    value: "ab",
    matcher: /^[ab].*/i,
  },
  {
    label: "C - D",
    value: "cd",
    matcher: /^[cd].*/i,
  },
  {
    label: "E - F",
    value: "ef",
    matcher: /^[ef].*/i,
  },
  {
    label: "G - H",
    value: "gh",
    matcher: /^[gh].*/i,
  },
  {
    label: "I - J",
    value: "ij",
    matcher: /^[ij].*/i,
  },
  {
    label: "K - L",
    value: "kl",
    matcher: /^[kl].*/i,
  },
  {
    label: "M - N",
    value: "mn",
    matcher: /^[mn].*/i,
  },
  {
    label: "O - P",
    value: "op",
    matcher: /^[op].*/i,
  },
  {
    label: "Q - R",
    value: "qr",
    matcher: /^[qr].*/i,
  },
  {
    label: "S - T",
    value: "st",
    matcher: /^[st].*/i,
  },
  {
    label: "U - V",
    value: "uv",
    matcher: /^[uv].*/i,
  },
  {
    label: "W - X",
    value: "wx",
    matcher: /^[wx].*/i,
  },
  {
    label: "Y - Z",
    value: "yz",
    matcher: /^[yz].*/i,
  },
];
