import { BenEncoder } from "@zhexin/bencoder";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { crypto } from "@std/crypto/crypto";

type File = {
  length: number;
  path: string;
};
type Torrent = {
  "created by": string;
  "creation date": number;
  info: {
    length: number;
    name: string;
    "piece length": number;
    pieces: Uint8Array;
    files?: Array<File>;
  };
};

const createTorrentFile = async (path?: string) => {
  if (!path) return null;

  const file = await Deno.readFile(path);

  // sometimes might just be .jpg 🤷‍♂️
  const name = path.split("/").pop() ?? "fallback";
  const length = file.length;
  const pieces = await crypto.subtle.digest("SHA-1", file);
  const pieceLength = 32768;

  const myTorrent: Torrent = {
    "created by": "The hehe client",
    "creation date": Math.floor(Date.now() / 1000),
    info: {
      length,
      name,
      "piece length": pieceLength,
      pieces: new Uint8Array(pieces),
    },
  };

  const encoded = BenEncoder(myTorrent);

  console.log(myTorrent);

  Deno.writeFile(`testFiles/resultTorrents/${name}.torrent`, encoded);
};

if (import.meta.main) {
  const { path } = parseArgs(Deno.args, {
    string: ["path"],
  });

  createTorrentFile(path);
}
