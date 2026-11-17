import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../out/", import.meta.url)));
const port = Number(process.env.PORT ?? 3000);
if (!existsSync(join(root, "index.html")))
  throw new Error("Run npm run build first: out/index.html is missing.");
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error("Invalid PORT");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};
createServer((request, response) => {
  let file;
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep))
      throw new Error("Outside static output");
    if (existsSync(file) && statSync(file).isDirectory())
      file = join(file, "index.html");
    if (!existsSync(file) || !statSync(file).isFile()) {
      file = join(root, "404.html");
      response.statusCode = 404;
    }
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }
  response.setHeader(
    "Content-Type",
    types[extname(file)] ?? "application/octet-stream",
  );
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  const stream = createReadStream(file);
  stream.on("error", () => {
    response.statusCode = 500;
    response.end("Unable to read static asset");
  });
  stream.pipe(response);
}).listen(port, "127.0.0.1", () =>
  console.log(`Sử Đồ: http://127.0.0.1:${port}`),
);
